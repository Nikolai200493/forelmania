import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "header" | "footer";
  className?: string;
}

export default function Logo({ variant = "header", className = "" }: LogoProps) {
  const isFooter = variant === "footer";
  const primaryColor = isFooter ? "#ffffff" : "var(--color-primary)";
  const accentColor = isFooter ? "rgba(255,255,255,0.7)" : "var(--color-secondary)";

  return (
    <Link
      to="/"
      className={`flex items-center gap-2.5 shrink-0 group ${className}`}
      aria-label="Forelmania — на главную"
    >
      {/* Fish + Crown Icon */}
      <svg
        width={isFooter ? "40" : "44"}
        height={isFooter ? "40" : "44"}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:scale-105"
      >
        {/* Circle border */}
        <circle
          cx="50"
          cy="50"
          r="46"
          stroke={primaryColor}
          strokeWidth="2.5"
        />
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke={primaryColor}
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Crown */}
        <g transform="translate(32, 12)" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0 18 L6 8 L12 14 L18 4 L24 14 L30 8 L36 18" fill="none" />
          <path d="M2 18 L34 18" />
          <circle cx="18" cy="4" r="1.5" fill={primaryColor} />
          <circle cx="6" cy="8" r="1" fill={primaryColor} />
          <circle cx="30" cy="8" r="1" fill={primaryColor} />
        </g>

        {/* Fish body */}
        <g transform="translate(14, 28)">
          {/* Main body */}
          <path
            d="M58 24 C58 24 54 10 40 8 C30 6.5 20 10 14 16 C8 22 4 30 8 38 C12 46 22 50 32 48 C42 46 50 40 54 34 C56 30 58 24 58 24 Z"
            stroke={primaryColor}
            strokeWidth="2"
            fill="none"
          />

          {/* Tail */}
          <path
            d="M8 38 C4 42 0 50 2 54 C6 50 10 46 14 48 C10 44 8 38 8 38 Z"
            stroke={primaryColor}
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M14 16 C10 12 4 6 2 4 C4 10 6 16 4 20 C8 18 14 16 14 16 Z"
            stroke={primaryColor}
            strokeWidth="1.5"
            fill="none"
          />

          {/* Eye */}
          <circle cx="46" cy="20" r="3" stroke={primaryColor} strokeWidth="1.5" fill="none" />
          <circle cx="46.5" cy="19.5" r="1" fill={primaryColor} />

          {/* Gill line */}
          <path
            d="M40 14 C38 20 38 28 40 34"
            stroke={primaryColor}
            strokeWidth="1.5"
            fill="none"
          />

          {/* Scales pattern */}
          <path d="M24 20 C26 18 28 18 30 20" stroke={accentColor} strokeWidth="1" fill="none" />
          <path d="M20 26 C22 24 24 24 26 26" stroke={accentColor} strokeWidth="1" fill="none" />
          <path d="M28 26 C30 24 32 24 34 26" stroke={accentColor} strokeWidth="1" fill="none" />
          <path d="M16 32 C18 30 20 30 22 32" stroke={accentColor} strokeWidth="1" fill="none" />
          <path d="M24 32 C26 30 28 30 30 32" stroke={accentColor} strokeWidth="1" fill="none" />
          <path d="M32 32 C34 30 36 30 38 32" stroke={accentColor} strokeWidth="1" fill="none" />
          <path d="M18 38 C20 36 22 36 24 38" stroke={accentColor} strokeWidth="1" fill="none" />
          <path d="M26 38 C28 36 30 36 32 38" stroke={accentColor} strokeWidth="1" fill="none" />

          {/* Dorsal fin */}
          <path
            d="M30 8 C28 4 32 2 36 6 C38 2 42 4 40 8"
            stroke={primaryColor}
            strokeWidth="1.5"
            fill="none"
          />

          {/* Belly fin */}
          <path
            d="M28 44 C26 48 30 50 32 46"
            stroke={primaryColor}
            strokeWidth="1.5"
            fill="none"
          />

          {/* Mouth */}
          <path
            d="M56 22 C60 22 62 24 60 26 C58 26 56 26 54 24"
            stroke={primaryColor}
            strokeWidth="1.5"
            fill="none"
          />

          {/* Spots */}
          <circle cx="34" cy="18" r="1" fill={accentColor} opacity="0.5" />
          <circle cx="28" cy="22" r="0.8" fill={accentColor} opacity="0.5" />
          <circle cx="22" cy="28" r="1" fill={accentColor} opacity="0.5" />
          <circle cx="30" cy="38" r="0.8" fill={accentColor} opacity="0.5" />
          <circle cx="36" cy="28" r="0.8" fill={accentColor} opacity="0.5" />
        </g>
      </svg>

      {/* Text */}
      <div className="flex flex-col">
        <span
          className={`font-heading font-extrabold tracking-[0.15em] leading-none ${
            isFooter
              ? "text-xl text-white"
              : "text-xl text-primary group-hover:text-secondary transition-colors duration-300"
          }`}
        >
          FORELMANIA
        </span>
        <span
          className={`text-[0.625rem] tracking-[0.3em] uppercase leading-none mt-1 ${
            isFooter ? "text-white/60" : "text-text-light"
          }`}
        >
          Premium Seafood
        </span>
      </div>
    </Link>
  );
}
