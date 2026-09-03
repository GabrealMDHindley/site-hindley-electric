"use client";

import { useEffect, useRef, useState } from "react";

const FADE_MS = 600;
const FALLBACK_TIMEOUT_MS = 13000; // safety net if the video never fires "ended" — video is ~10s

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false);
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const finishedRef = useRef(false);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setFading(true);
    window.setTimeout(() => setDone(true), FADE_MS);
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      setDone(true);
      return;
    }

    setMounted(true);

    const fallback = window.setTimeout(finish, FALLBACK_TIMEOUT_MS);
    return () => window.clearTimeout(fallback);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!mounted || !video) return;

    video.addEventListener("ended", finish);
    video.addEventListener("error", finish);

    // Some mobile browsers reject the implicit autoplay from the `autoPlay`
    // attribute even when muted+playsInline; force it explicitly and skip
    // the intro rather than get stuck if the browser still refuses.
    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => finish());
    }

    return () => {
      video.removeEventListener("ended", finish);
      video.removeEventListener("error", finish);
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
            onClick={finish}
            className="focus-ring absolute bottom-6 right-6 font-display text-xs uppercase tracking-[0.2em] text-bone/50 transition-colors hover:text-amber"
          >
            Skip
          </button>
        </>
      )}
    </div>
  );
}
