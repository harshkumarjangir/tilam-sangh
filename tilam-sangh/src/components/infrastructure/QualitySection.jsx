import React from "react";
import { getAssetUrl } from "../../utils/imageHandler";

export default function QualitySection({ qualityAssurance }) {
  const { heading, subheading, labs, image } = qualityAssurance;

  return (
    <section className="bg-gray-50 py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-800 mb-2">
            {heading}
          </h2>
          <p className="text-sm md:text-base text-gray-800 mb-4">
            {subheading}
          </p>
          <div className="space-y-3">
            {labs?.map((lab) => (
              <div
                key={lab.id}
                className="border-l-4 border-yellow-500 bg-white rounded-r-xl px-4 py-3 shadow-sm"
              >
                <h3 className="text-sm md:text-base font-semibold text-yellow-900 mb-1">
                  {lab.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-700">
                  {lab.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {image && (
          <div className="relative overflow-hidden rounded-2xl shadow-md">
            <img
              src={getAssetUrl(image)}
              alt={heading}
              className="w-full h-full object-cover max-h-72 md:max-h-80"
            />
            <div className="absolute inset-0  from-yellow-900/40 via-transparent" />
          </div>
        )}
      </div>
    </section>
  );
}
