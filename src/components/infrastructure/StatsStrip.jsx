import React from "react";

export default function StatsStrip({ statsStrip }) {
  const { items } = statsStrip;
  return (
    <section className="bg-yellow-600 text-yellow-50">
      <div className="max-w-6xl mx-auto px-4 py-4 md:py-5 grid grid-cols-2 md:grid-cols-4 gap-3">
        {items?.map((item, idx) => (
          <div
            key={idx}
            className="border border-yellow-300/40 rounded-lg px-3 py-2 md:px-4 md:py-3 bg-yellow-600/70"
          >
            <p className="text-[11px] uppercase tracking-wide opacity-90">
              {item.label}
            </p>
            <p className="text-lg md:text-2xl font-extrabold leading-tight">
              {item.value}
            </p>
            <p className="text-xs md:text-[13px] opacity-90">
              {item.note}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
