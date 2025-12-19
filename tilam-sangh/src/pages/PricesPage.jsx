import React, { useState } from "react";
import pricesData from "../data/pricesData.json";

import HeroSection from "../components/infrastructure/HeroSection";
import PDFDownload from "../components/marketing/PDFDownload";
import StatsCard from "../components/marketing/StatsCard";
import MarketingTable from "../components/marketing/MarketingTable";
import Gallery from "../components/marketing/Gallery";

export default function PricesPage() {
  const [data] = useState(pricesData);

  const totalLatest = data.years.reduce((s, y) => s + (y.total || 0), 0);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <HeroSection hero={data.hero} />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard title="कुल मूल्य" value={`${totalLatest} ₹`} hint="कुल कीमत (संयोजन)" />
          <StatsCard title="अंतिम अद्यतन" value={data.lastUpdated} hint="Date Updated" />
          <div>
            <PDFDownload pdf={data.pdfs[0]} />
          </div>
        </div>

        {/* TABLE + INTRO + GALLERY */}
        <div id="price-table-section" className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* TABLE */}
          <MarketingTable rows={data.years} />

          {/* INTRO + GALLERY */}
          <div className="space-y-4">

            <div className="bg-white rounded-md p-4 border shadow-sm">
              <h4 className="text-lg font-semibold text-yellow-900">मूल्य विवरण</h4>
              <p className="mt-2 text-sm text-gray-700">{data.page.intro}</p>
            </div>

            <div className="bg-white rounded-md p-4 border shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-semibold text-yellow-900">गैलरी</h4>
                <a href="/gallery" className="text-xl text-red-500 underline">view all</a>
              </div>
              <Gallery images={data.gallery} />
            </div>

          </div>
        </div>

        {/* PDF SECTION */}
        <div id="price-pdf-section" className="bg-white p-4 rounded-md border shadow-sm">
          <h3 className="text-lg font-semibold text-yellow-900">मूल्य सूची PDF</h3>

          <div className="mt-3 grid md:grid-cols-2 gap-3">
            {data.pdfs.map((pdf) => (
              <PDFDownload key={pdf.id} pdf={pdf} />
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
