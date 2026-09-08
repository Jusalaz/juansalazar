export default function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M8 46 L8 38 L20 38 L20 30 L32 30 L32 18 L44 18"
        stroke="var(--color-accent)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="44" cy="18" r="6" fill="var(--color-amber)" />
      <line
        x1="49"
        y1="14"
        x2="56"
        y2="8"
        stroke="var(--color-coral)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="58" cy="6" r="3" fill="var(--color-coral)" fillOpacity="0.5" />
    </svg>
  );
}
