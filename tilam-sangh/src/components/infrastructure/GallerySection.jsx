import React from "react";
import { getAssetUrl } from "../../utils/imageHandler";

export default function GallerySection({ gallerySection }) {
  const { heading, subheading, images } = gallerySection;

  return (
    <section className="bg-gray-50 py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-800 mb-1">
            {heading}
          </h2>
          <p className="text-sm md:text-base text-gray-700">{subheading}</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {images?.map((img) => (
            <figure
              key={img.id}
              className="relative rounded-xl overflow-hidden shadow-sm hover:shadow-md"
            >
              <img
                src={getAssetUrl(img.src)}
                alt={img.alt}
                className="w-full h-32 md:h-40 object-cover hover:scale-105 transition-transform duration-300"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent text-[11px] md:text-xs text-yellow-50 px-2 py-1.5">
                {img.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
