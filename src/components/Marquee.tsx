export default function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  const track = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {track.map((label, i) => (
              <span key={`${copy}-${i}`} className="flex items-center">
                <span className="px-4 font-mono text-xs font-semibold uppercase tracking-[0.15em] whitespace-nowrap">
                  {label}
                </span>
                <span aria-hidden>•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
