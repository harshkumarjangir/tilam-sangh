import React from "react";
import { getAssetUrl } from '../../utils/imageHandler';

export default function HeroSection({ hero }) {
  const {
    badge,
    title,
    subtitle,
    backgroundImage,
    overlayOpacity,
    breadcrumb,
    ctaPrimary,
    ctaSecondary,
  } = hero;

  return (
    <section
      className="
    relative w-full 
    min-h-[300px] md:min-h-[420px] lg:min-h-[520px]
    flex items-center pt-6
  "
      style={{
        backgroundImage: `url(${getAssetUrl(backgroundImage)})`,
        backgroundSize: "100% auto",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0 "
        style={{ opacity: overlayOpacity ?? 0.8 }}
      />
      <div className="relative w-full max-w-6xl mx-auto px-4 py-10 md:py-14 text-white">
        {/* Breadcrumb */}
        <nav className="text-xs md:text-sm mb-3 opacity-90">
          {breadcrumb?.map((item, index) => (
            <span key={item.href || index}>
              {index > 0 && <span className="mx-1">/</span>}
              <a
                href={item.href}
                className="hover:underline hover:text-yellow-200"
              >
                {item.label}
              </a>
            </span>
          ))}
        </nav>

        {/* Badge */}
        {badge && (
          <div className="inline-flex px-3 py-1 rounded-full bg-yellow-400/90 text-yellow-950 text-xs md:text-sm font-semibold mb-3">
            {badge}
          </div>
        )}

        <h1 className="text-2xl md:text-4xl font-extrabold leading-snug drop-shadow-md">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm md:text-base text-yellow-50/95">
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="mt-5 flex flex-wrap gap-3">
          {ctaPrimary && (
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById(ctaPrimary.targetId);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2 text-sm md:text-base rounded-full bg-white text-yellow-800 font-semibold shadow-md hover:bg-yellow-100 transition"
            >
              {ctaPrimary.label}
            </button>
          )}
          {ctaSecondary && (
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById(ctaSecondary.targetId);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-5 py-2 text-sm md:text-base rounded-full border border-yellow-200/80 text-white font-semibold hover:bg-white/10 transition"
            >
              {ctaSecondary.label}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
