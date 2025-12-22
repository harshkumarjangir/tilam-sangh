import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const SchemesSection = ({ data = {} }) => {
    const schemes = data || [];

    return (
        <section className="py-12 px-8">
            <h2 className="text-center text-3xl font-semibold mb-8 tracking-wide">
                SCHEMES
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 px-4">
                {(schemes || []).map((item, index) => (
                    <Link
                        key={index}
                        to={item.link}
                        target="_blank"
                        className="relative bg-white border border-gray-400 rounded-md shadow-lg hover:shadow-2xl transition overflow-hidden group"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="h-48 w-full object-contain p-0"
                        />

                        <div className="bg-[#C64827] text-white text-center py-3 font-semibold text-sm truncate">
                            {item.title}
                        </div>

                        <div className="absolute inset-0 bg-black/10 bg-opacity-70 flex items-center justify-center 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4">
                            <h3 className="text-white bg-[#808080] text-sm font-bold text-center p-2 leading-snug">
                                {item.title}
                            </h3>
                        </div>
                    </Link>
                ))}

                {/* View more box */}
            </div>
        </section>
    );
};

export default SchemesSection;
