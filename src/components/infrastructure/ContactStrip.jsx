import React from "react";

export default function ContactStrip({ contactStrip }) {
  const { heading, description, cta } = contactStrip;

  return (
    <section className="bg-yellow-700 text-yellow-50 py-6 md:py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-1">
            {heading}
          </h2>
          <p className="text-xs md:text-sm opacity-95">{description}</p>
        </div>
        {cta && (
          <a
            href={cta.href}
            className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-white text-yellow-800 text-sm md:text-base font-semibold shadow-md hover:bg-yellow-100 transition"
          >
            {cta.label}
          </a>
        )}
      </div>
    </section>
  );
}
