import React from "react";
import profileData from "../data/profileData.json";

import HeroSection from "../components/infrastructure/HeroSection";
import StatsCard from "../components/marketing/StatsCard";
import PDFDownload from "../components/marketing/PDFDownload";
import Gallery from "../components/marketing/Gallery";

export default function ProfilePage() {
  const { hero, page, highlights, timeline, pdfs, gallery } = profileData;

  return (
    <div className="min-h-screen bg-white">
      {/* HERO (same as before) */}
      <HeroSection hero={hero} />

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-12">

        {/* INTRO SECTION */}
        <section className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded">
          <h2 className="text-2xl font-bold text-yellow-900 mb-3">
            {page.title}
          </h2>
          <p className="text-gray-800 leading-relaxed text-sm md:text-base">
            {page.intro}
          </p>
        </section>

        {/* HIGHLIGHTS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {highlights.map((item, index) => (
            <StatsCard
              key={index}
              title={item.title}
              value={item.value}
              hint={item.hint}
            />
          ))}
        </section>

        {/* TIMELINE */}
        <section>
          <h3 className="text-xl font-semibold text-yellow-900 mb-4">
            संगठन की विकास यात्रा
          </h3>

          <div className="space-y-4">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-white border rounded shadow-sm"
              >
                <span className="text-sm font-semibold text-yellow-700">
                  {item.year}
                </span>
                <p className="mt-2 text-sm text-gray-700">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* DOCUMENTS */}
        <section>
          <h3 className="text-xl font-semibold text-yellow-900 mb-4">
            रिपोर्ट्स एवं अभिलेख
          </h3>

          <div className="grid md:grid-cols-2 gap-4">
            {pdfs.map((pdf) => (
              <PDFDownload key={pdf.id} pdf={pdf} />
            ))}
          </div>
        </section>

        {/* GALLERY */}
        {/* {gallery?.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold text-yellow-900 mb-4">
              गैलरी
            </h3>
            <Gallery images={gallery} />
          </section>
        )} */}
      </main>
    </div>
  );
}
