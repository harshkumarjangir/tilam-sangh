import React from "react";

export default function IntroSection({ introSection }) {
  const { heading, highlight, paragraphs, pillars } = introSection;

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-800 mb-2">
            {heading}
          </h2>
          {highlight && (
            <p className="inline-block px-4 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs md:text-sm font-semibold">
              {highlight}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-[2fr,3fr] gap-8 items-start">
          <div className="space-y-3 text-sm md:text-base text-gray-800 leading-relaxed">
            {paragraphs?.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 md:grid-cols-3 gap-4">
            {pillars?.map((pillar) => (
              <div
                key={pillar.id}
                className="border border-yellow-200 rounded-xl p-4 bg-yellow-50/60 shadow-sm hover:shadow-md hover:border-yellow-300 transition"
              >
                <h3 className="text-sm md:text-base font-semibold text-yellow-800 mb-1">
                  {pillar.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-700">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
