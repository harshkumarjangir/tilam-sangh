// components/Gallery.jsx
import React from "react";

export default function Gallery({ images = [] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {images.map((src, i) => (
        <div key={i} className="overflow-hidden rounded-md shadow-sm border">
          <img
            src={src}
            alt={`gallery-${i}`}
            className="w-full h-44 object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
