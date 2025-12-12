import React, { useState } from "react";
import profileData from "../data/profileData.json";

import HeroSection from "../components/infrastructure/HeroSection";
import PDFDownload from "../components/marketing/PDFDownload";
import StatsCard from "../components/marketing/StatsCard";
import MarketingTable from "../components/marketing/MarketingTable";
import Gallery from "../components/marketing/Gallery";

export default function ProfilePage() {
  const [data] = useState(profileData);

  const totalYears = 30;
  const totalReports = data.pdfs.length;

  return (
    <div className="min-h-screen bg-white">
      <HeroSection hero={data.hero} />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard title="कुल वर्षों की यात्रा" value={totalYears} hint="इतिहास और विकास" />
          <StatsCard title="उपलब्ध रिपोर्ट्स" value={totalReports} hint="PDF दस्तावेज़" />
          <PDFDownload pdf={data.pdfs[0]} />
        </div>

        {/* Table + Side Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Timeline Table */}
          <MarketingTable rows={data.years} />

          {/* Intro + Gallery */}
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-md border shadow-sm">
              <h3 className="text-lg font-semibold text-yellow-900">संक्षिप्त परिचय</h3>
              <p className="mt-2 text-sm text-gray-700">{data.page.intro}</p>
            </div>

            <div className="p-4 bg-white rounded-md border shadow-sm">
              <h4 className="text-lg font-semibold text-yellow-900">गैलरी</h4>
              <Gallery images={data.gallery} />
            </div>
          </div>
        </div>

        {/* All PDFs */}
        <div className="p-4 bg-white rounded-md border shadow-sm">
          <h3 className="text-lg font-semibold text-yellow-900">रिपोर्ट्स व अभिलेख</h3>
          <div className="mt-3 grid md:grid-cols-2 gap-3">
            {data.pdfs.map(pdf => (
              <PDFDownload key={pdf.id} pdf={pdf} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
