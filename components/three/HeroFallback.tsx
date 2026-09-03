export default function HeroFallback() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      aria-hidden
    >
      <div
        className="h-[60vmin] w-[60vmin] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,195,0,0.55) 0%, rgba(255,195,0,0) 70%)",
        }}
      />
      <svg
        viewBox="0 0 100 100"
        className="absolute h-[28vmin] w-[28vmin] text-amber drop-shadow-[0_0_30px_rgba(255,195,0,0.6)]"
        fill="currentColor"
      >
        <polygon points="58,4 20,54 46,54 40,96 82,42 54,42" />
      </svg>
    </div>
  );
}
