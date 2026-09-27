"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site-config";

type Role = "user" | "assistant";
type Message = { role: Role; content: string };
type WidgetState = "idle" | "streaming" | "unavailable" | "error";

const SUGGESTIONS = [
  "What areas do you serve?",
  "What are your hours?",
  "Do you handle EV charger installs?",
  "Do you offer emergency service?",
];

const GREETING =
  `Hey — I'm the ${siteConfig.businessName} site assistant. Ask me about our services, ` +
  `hours, service area, or anything else, and I'll do my best to help.`;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [state, setState] = useState<WidgetState>("idle");
  const listRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || state === "streaming") return;

    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setInput("");
    setState("streaming");

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
        signal: controller.signal,
      });

      if (res.status === 503) {
        setState("unavailable");
        setMessages((prev) => prev.slice(0, -1));
        return;
      }
      if (!res.ok || !res.body) {
        throw new Error("Chat request failed");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          copy[copy.length - 1] = { ...last, content: last.content + chunk };
          return copy;
        });
      }

      setState("idle");
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setState("error");
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Chat with ${siteConfig.businessName}`}
          className="flex h-[70vh] max-h-[520px] w-[92vw] max-w-sm flex-col border border-bone/15 bg-surface shadow-[0_10px_50px_rgba(0,0,0,0.6)]"
        >
          <div className="flex items-center justify-between border-b border-bone/10 bg-ground px-4 py-3">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.2em] text-red">
                Ask Us
              </p>
              <p className="text-sm text-bone/90">{siteConfig.businessName}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="focus-ring text-bone/60 transition-colors hover:text-red"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path
                  d="M5 5l10 10M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div
            ref={listRef}
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            <ChatBubble role="assistant" content={GREETING} />

            {messages.length === 0 && state !== "unavailable" && (
              <div className="flex flex-wrap gap-2 pt-1">
                {SUGGESTIONS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => void sendMessage(q)}
                    className="focus-ring border border-bone/20 px-3 py-1.5 text-xs text-bone/80 transition-colors hover:border-red hover:text-red"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => (
              <ChatBubble key={i} role={m.role} content={m.content} />
            ))}

            {state === "unavailable" && (
              <p className="border border-red/30 bg-ground p-3 text-sm text-bone/70">
                Chat isn&rsquo;t quite live yet. In the meantime,{" "}
                <a href="/contact" className="text-red hover:text-red-glow">
                  use the contact form
                </a>{" "}
                {siteConfig.phoneDisplay && (
                  <>
                    or call{" "}
                    <a href={`tel:${siteConfig.phone}`} className="text-red hover:text-red-glow">
                      {siteConfig.phoneDisplay}
                    </a>
                  </>
                )}
                .
              </p>
            )}

            {state === "error" && (
              <p role="alert" className="text-sm text-red-glow">
                Something went wrong. Please try again, or use the contact form.
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-bone/10 p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question…"
              disabled={state === "unavailable"}
              className="focus-ring min-w-0 flex-1 border border-bone/20 bg-ground px-3 py-2 text-sm text-bone placeholder:text-muted/60 focus:border-red disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={state === "streaming" || state === "unavailable" || !input.trim()}
              className="focus-ring bg-red px-4 py-2 font-display text-xs uppercase tracking-wide text-ground transition-colors hover:bg-red-glow disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : "Open chat"}
        className="focus-ring flex h-14 w-14 items-center justify-center rounded-full bg-red text-ground shadow-[0_0_24px_rgba(229,35,27,0.5)] transition-all hover:bg-red-glow active:scale-95"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8A2.5 2.5 0 0 1 17.5 16H10l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-8Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

function ChatBubble({ role, content }: { role: Role; content: string }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <p
        className={`max-w-[85%] whitespace-pre-wrap px-3 py-2 text-sm leading-relaxed ${
          isUser
            ? "bg-red text-ground"
            : "border border-bone/10 bg-ground text-bone/90"
        }`}
      >
        {content || (
          <span className="inline-flex gap-1" aria-label="Thinking">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-bone/50" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-bone/50 [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-bone/50 [animation-delay:300ms]" />
          </span>
        )}
      </p>
    </div>
  );
}
