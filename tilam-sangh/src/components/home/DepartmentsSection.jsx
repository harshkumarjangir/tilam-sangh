import React from "react";
import { Link } from "react-router-dom";

const DepartmentsSection = ({ data = [] }) => {
    const departments = data || [];

    return (
        <section className="py-10 px-8">
            <h2 className="text-center text-3xl font-semibold mb-6">
                RELATED DEPARTMENTS
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 px-4">
                {departments.map((item, index) => (
                    <Link
                        key={index}
                        to={item.link}
                        target="_blank"
                        className="bg-white border border-gray-400 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition p-1 text-center"
                    >
                        <img src={item.image} alt={item.title} className="h-38 w-full object-contain" />
                        <div className="mt-2 bg-[#C64827] text-white py-1 rounded">
                            {item.title}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default DepartmentsSection;
