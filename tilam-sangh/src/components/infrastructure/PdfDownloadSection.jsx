import React from "react";
import { FaDownload } from "react-icons/fa";
import { getAssetUrl } from "../../utils/imageHandler";

export default function PdfDownloadSection({ data }) {
    const { pdfSectionHeading, pdfs } = data;

    return (
        <section className="w-full bg-yellow-50 py-10">
            <h2 className="text-center text-3xl font-bold text-[#894B00] mb-8">
                {pdfSectionHeading}
            </h2>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                {pdfs.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white shadow-md p-5 rounded-lg border border-yellow-300 hover:shadow-lg transition"
                    >
                        <h3 className="text-xl font-semibold text-[#894B00]">
                            {item.title}
                        </h3>

                        <p className="text-gray-700 mt-2">{item.description}</p>

                        <p className="text-sm text-gray-500 mt-2">
                            तिथि: {new Date(item.date).toLocaleDateString("hi-IN")}
                        </p>

                        <a
                            href={getAssetUrl(item.pdfUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition"
                        >
                            <FaDownload /> डाउनलोड PDF
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}
