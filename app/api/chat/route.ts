import Anthropic from "@anthropic-ai/sdk";
import { buildSystemPrompt } from "@/lib/chat-knowledge";

export const runtime = "nodejs";

const MODEL = "claude-sonnet-5";
const MAX_TOKENS = 500;
const MAX_HISTORY_MESSAGES = 12; // caller sends recent turns only — bounds cost per request
const MAX_MESSAGE_LENGTH = 2000;

type ChatMessage = { role: "user" | "assistant"; content: string };

function isChatMessage(m: unknown): m is ChatMessage {
  if (!m || typeof m !== "object") return false;
  const r = m as Record<string, unknown>;
  return (r.role === "user" || r.role === "assistant") && typeof r.content === "string";
}

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Chat widget isn't wired up yet — see status.md "Needs-me list". The
    // frontend shows a friendly "currently unavailable" state for this.
    return new Response(JSON.stringify({ error: "unavailable" }), {
      status: 503,
      headers: { "content-type": "application/json" },
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "bad_request" }), { status: 400 });
  }

  const rawMessages =
    body && typeof body === "object" && Array.isArray((body as Record<string, unknown>).messages)
      ? ((body as Record<string, unknown>).messages as unknown[])
      : [];

  const messages: ChatMessage[] = rawMessages
    .filter(isChatMessage)
    .slice(-MAX_HISTORY_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return new Response(JSON.stringify({ error: "bad_request" }), { status: 400 });
  }

  const client = new Anthropic({ apiKey });
  const encoder = new TextEncoder();

  const body_stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const stream = client.messages.stream({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: buildSystemPrompt(),
          messages,
        });

        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }

        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(
            encoder.encode(
              "\n\nI can't help with that one — try rephrasing, or use the contact form and Nick will follow up directly."
            )
          );
        }
      } catch (err) {
        console.error("Chat widget error:", err);
        controller.enqueue(
          encoder.encode(
            "\n\nSorry — something went wrong on our end. Please try again, or use the contact form."
          )
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(body_stream, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
