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
      <h2 className="font-display text-4xl leading-[1.08] tracking-[-0.035em] text-ink text-balance sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted text-balance">
          {description}
        </p>
      ) : null}
    </div>
  );
}
