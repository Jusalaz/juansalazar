export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent mb-3">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-4xl sm:text-5xl text-ink text-balance">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base sm:text-lg text-muted text-balance">
          {description}
        </p>
      ) : null}
    </div>
  );
}
