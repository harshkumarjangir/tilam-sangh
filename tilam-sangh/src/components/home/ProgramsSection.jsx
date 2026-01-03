import React from "react";
import { Link } from "react-router-dom";

const ProgramsSection = ({ data = [] }) => {
  const programs = data || [];

  return (
    <section className="py-12 px-8">
      <h2 className="text-center text-3xl font-semibold mb-8 tracking-wide">
        PROGRAMS
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 px-4">
        {programs.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            target="_blank"
            className="relative bg-white border border-gray-400 rounded-md shadow-lg hover:shadow-2xl transition overflow-hidden group"
          >
            {/* Program Image */}
            <img
              src={item.image}
              alt={item.title}
              className="h-48 w-full object-contain p-0"
            />

            {/* Bottom Title */}
            <div className="bg-[#C64827] text-white text-center py-3 font-semibold text-sm truncate">
              {item.title}
            </div>

            {/* Hover Gray Overlay with Full Description */}
            <div className="absolute inset-0 bg-black/10 bg-opacity-70 
                flex items-center justify-center opacity-0 group-hover:opacity-100 
                transition-opacity duration-300 px-6">
              <p className="text-white bg-[#808080] text-base font-medium text-center p-2 leading-snug">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProgramsSection;
