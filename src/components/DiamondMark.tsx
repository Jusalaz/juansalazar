export default function DiamondMark({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`rotate-45 border-2 ${className}`}
    />
  );
}
