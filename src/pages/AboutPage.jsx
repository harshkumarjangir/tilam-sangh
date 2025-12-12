import React, { useState } from "react";
import aboutData from "../data/aboutData.json";

import HeroSection from "../components/infrastructure/HeroSection";
import PDFDownload from "../components/marketing/PDFDownload";
import Gallery from "../components/marketing/Gallery";

import AboutSection from "../components/about/AboutSection";
import LeadershipGrid from "../components/about/LeadershipGrid";

export default function AboutPage() {
  const [data] = useState(aboutData);

  return (
    <div className="min-h-screen bg-white">
      <HeroSection hero={data.hero} />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">

        {/* INTRO */}
        <section className="bg-white p-6 border rounded shadow-sm">
          <h2 className="text-2xl font-semibold text-yellow-900">परिचय</h2>
          <p className="mt-2 text-gray-700">{data.page.intro}</p>
        </section>

        {/* HISTORY */}
        <AboutSection section={data.sections.history} />

        {/* MISSION */}
        <AboutSection section={data.sections.mission} />

        {/* VISION */}
        <AboutSection section={data.sections.vision} />

        {/* LEADERSHIP */}
        <section>
          <h2 className="text-2xl font-semibold text-yellow-900 mb-4">
            नेतृत्व एवं प्रबंधन
          </h2>
          <LeadershipGrid members={data.sections.leadership.members} />
        </section>

        {/* PDF DOWNLOADS */}
        <section className="bg-white p-6 border rounded shadow-sm">
          <h2 className="text-xl font-semibold text-yellow-900 mb-4">
            दस्तावेज़ व अभिलेख
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {data.pdfs.map((pdf) => (
              <PDFDownload key={pdf.id} pdf={pdf} />
            ))}
          </div>
        </section>

        {/* GALLERY */}
        <section>
           <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-semibold text-yellow-900">गैलरी</h4>
                <a href="/gallery" className="text-xl text-red-500 underline"> view all</a>
              </div>
          <Gallery images={data.gallery} />
        </section>

      </main>
    </div>
  );
}
