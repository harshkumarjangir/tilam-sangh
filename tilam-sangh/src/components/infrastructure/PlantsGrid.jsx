import React from "react";
import { getAssetUrl } from "../../utils/imageHandler";

export default function PlantsGrid({ plantsSection }) {
  const { id, heading, subheading, introText, note, plants } = plantsSection;


  return (
    <section id={id} className="bg-gray-50 py-10 md:py-14">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-3xl mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-800 mb-2">
            {heading}
          </h2>
          <p className="text-sm md:text-base text-gray-800 mb-3">
            {subheading}
          </p>
          <p className="text-sm md:text-base text-gray-700">{introText}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {plants?.map((plant) => (
            <article
              key={plant.id}
              className="bg-white border border-yellow-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
            >
              {plant.image && (
                <div className="h-32 md:h-40 w-full overflow-hidden">
                  <img
                    src={getAssetUrl(plant.image)}
                    alt={plant.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4 flex flex-col gap-1 flex-1">
                <h3 className="text-base md:text-lg font-semibold text-yellow-800">
                  {plant.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-700">
                  स्थान: <span className="font-medium">{plant.location}</span>
                </p>
                <p className="text-xs md:text-sm">
                  स्थिति:{" "}
                  <span
                    className={
                      plant.status === "सक्रिय"
                        ? "text-green-700 font-semibold"
                        : "text-red-700 font-semibold"
                    }
                  >
                    {plant.status}
                  </span>
                </p>
                {plant.capacity && (
                  <p className="text-xs md:text-sm text-gray-700">
                    क्षमता: {plant.capacity}
                  </p>
                )}
                {plant.focus && plant.focus !== "—" && (
                  <p className="text-xs md:text-sm text-gray-700">
                    फोकस: {plant.focus}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        {note && (
          <p className="mt-6 text-xs md:text-sm text-gray-600 italic">
            * {note}
          </p>
        )}
      </div>
    </section>
  );
}
