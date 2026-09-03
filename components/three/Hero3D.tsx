"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import HeroFallback from "./HeroFallback";
import { useReducedMotion } from "@/lib/useReducedMotion";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export default function Hero3D() {
  const reduced = useReducedMotion();
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    setWebgl(hasWebGL());
  }, []);

  if (webgl === false) {
    return <HeroFallback />;
  }

  return (
    <div className="absolute inset-0">
      {webgl === null ? <HeroFallback /> : <HeroScene reduced={reduced} />}
    </div>
  );
}
