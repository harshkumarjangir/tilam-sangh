import React from "react";
import rtiData from "../data/rtiData.json";
import HeroSection from "../components/infrastructure/HeroSection";
import PDFDownload from "../components/marketing/PDFDownload";
import Gallery from "../components/marketing/Gallery";

export default function RTIPage() {
  const data = rtiData;

  return (
    <div className="min-h-screen bg-white">
      <HeroSection hero={data.hero} />

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">

        {/* Intro */}
        <div className="bg-white p-5 rounded-md shadow-sm border">
          <h2 className="text-2xl font-bold text-yellow-800">{data.page.title}</h2>
          <p className="text-gray-700 mt-2">{data.page.intro}</p>
        </div>

        {/* RTI Sections (Accordion) */}
        <div id="rti-process-section" className="space-y-4">
          {data.rtiSections.map((sec, index) => (
            <details
              key={index}
              className="border rounded-md shadow-sm p-4 bg-white cursor-pointer"
            >
              <summary className="font-semibold text-lg text-yellow-900">
                {sec.title}
              </summary>
              <p className="mt-2 whitespace-pre-line text-gray-700">{sec.content}</p>
            </details>
          ))}
        </div>

        {/* PDFs */}
        <div id="rti-disclosure-section" className="bg-white p-5 rounded-md border shadow-sm">
          <h3 className="text-lg font-semibold text-yellow-900">RTI दस्तावेज़ व अधिसूचनाएँ</h3>
          <div className="mt-3 grid md:grid-cols-2 gap-3">
            {data.pdfs.map((pdf) => (
              <PDFDownload key={pdf.id} pdf={pdf} />
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="bg-white p-5 rounded-md border shadow-sm">
          <h3 className="text-lg font-semibold text-yellow-900 mb-2">गैलरी</h3>
          <Gallery images={data.gallery} />
        </div>

      </main>
    </div>
  );
}
