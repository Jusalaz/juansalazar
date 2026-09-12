export default function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  index?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow ? (
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-coral-dark mb-3">
          {index ? `${index} / ` : ""}
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-5xl leading-[1] tracking-tight text-ink text-balance sm:text-6xl">
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
