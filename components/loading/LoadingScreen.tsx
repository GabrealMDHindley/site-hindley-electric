"use client";

import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "hindley-intro-seen";
const FADE_MS = 600;
const FALLBACK_TIMEOUT_MS = 6000; // safety net if the video never fires "ended"

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    let seenThisSession = false;
    try {
      seenThisSession = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // sessionStorage unavailable (private mode edge cases) — treat as unseen
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seenThisSession || reducedMotion) {
      setDone(true);
      return;
    }

    setMounted(true);

    const finish = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // ignore
      }
      setFading(true);
      window.setTimeout(() => setDone(true), FADE_MS);
    };

    const fallback = window.setTimeout(finish, FALLBACK_TIMEOUT_MS);
    return () => window.clearTimeout(fallback);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!mounted || !video) return;

    const onEnded = () => {
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // ignore
      }
      setFading(true);
      window.setTimeout(() => setDone(true), FADE_MS);
    };
    const onError = onEnded;

    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);
    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
    };
  }, [mounted]);

  if (done) return null;

  return (
    <div
      aria-hidden={!mounted}
      className={`fixed inset-0 z-[999] flex items-center justify-center bg-ground transition-opacity ease-out ${
        fading ? "opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      {mounted && (
        <>
          <video
            ref={videoRef}
            className="h-full w-full object-contain"
            poster="/videos/logo-intro/poster.jpg"
            autoPlay
            muted
            playsInline
            preload="auto"
          >
            <source src="/videos/logo-intro/logo-intro.webm" type="video/webm" />
            <source src="/videos/logo-intro/logo-intro.mp4" type="video/mp4" />
          </video>
          <button
            type="button"
            onClick={() => {
              try {
                sessionStorage.setItem(SESSION_KEY, "1");
              } catch {
                // ignore
              }
              setFading(true);
              window.setTimeout(() => setDone(true), FADE_MS);
            }}
            className="focus-ring absolute bottom-6 right-6 font-display text-xs uppercase tracking-[0.2em] text-bone/50 transition-colors hover:text-amber"
          >
            Skip
          </button>
        </>
      )}
    </div>
  );
}
