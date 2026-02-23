import { Link } from "react-router-dom";

interface LogoProps {
  variant?: "header" | "footer";
  className?: string;
}

export default function Logo({ variant = "header", className = "" }: LogoProps) {
  const isFooter = variant === "footer";

  return (
    <Link
      to="/"
      className={`flex items-center gap-2.5 shrink-0 group ${className}`}
      aria-label="Forelmania — на главную"
    >
      <img
        src="/images/logo.jpg"
        alt="Forelmania"
        className={`rounded-full object-cover transition-transform duration-300 group-hover:scale-105 ${
          isFooter ? "w-10 h-10" : "w-12 h-12"
        }`}
      />

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
