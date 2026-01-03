import React from "react";
import { getAssetUrl } from "../../utils/imageHandler";

export default function CooperativeSection({ cooperativeImpact }) {
  const { id, heading, intro, benefits, image } = cooperativeImpact;

  return (
    <section id={id} className="bg-white py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-[3fr,2fr] gap-8 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-800 mb-3">
            {heading}
          </h2>
          <p className="text-sm md:text-base text-gray-800 mb-4">{intro}</p>
          <ul className="space-y-2">
            {benefits?.map((b, idx) => (
              <li key={idx} className="flex gap-2 text-xs md:text-sm text-gray-800">
                <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-yellow-600 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {image && (
          <div className="relative overflow-hidden rounded-2xl shadow-md">
            <img
              src={getAssetUrl(image)}
              alt={heading}
              className="w-full h-full object-cover max-h-72"
            />
            <div className="absolute inset-0 bg-yellow-900/20" />
          </div>
        )}
      </div>
    </section>
  );
}
