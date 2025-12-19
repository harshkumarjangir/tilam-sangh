import React from "react";

export default function HighlightsSection({ infrastructureHighlights }) {
  const { heading, items } = infrastructureHighlights;

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-800 mb-6">
          {heading}
        </h2>
        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {items?.map((item) => (
            <div
              key={item.id}
              className="border border-yellow-100 bg-yellow-50/60 rounded-xl p-4 md:p-5 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-base md:text-lg font-semibold text-yellow-900 mb-2">
                {item.title}
              </h3>
              <ul className="space-y-1.5 text-xs md:text-sm text-gray-800">
                {item.points?.map((point, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="mt-[4px] h-1.5 w-1.5 rounded-full bg-yellow-600 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
