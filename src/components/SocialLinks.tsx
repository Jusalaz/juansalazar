import { socialLinks } from "@/lib/social";

export default function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${social.name}: ${social.handle}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/20 text-white transition-colors hover:border-white hover:bg-white/10"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d={social.path} />
          </svg>
        </a>
      ))}
    </div>
  );
}
