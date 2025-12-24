import React, { useEffect, useState } from "react";
import qualityData from "../data/qualityData.json";
import HeroSection from "../components/infrastructure/HeroSection";
import PDFDownload from "../components/marketing/PDFDownload";
import StatsCard from "../components/marketing/StatsCard";
import MarketingTable from "../components/marketing/MarketingTable";
import Gallery from "../components/marketing/Gallery";
import { useDispatch, useSelector } from "react-redux";
import { fetchPageBySlug } from "../redux/slices/pagesSlice";
import { useLocation } from "react-router-dom";

export default function QualityPage() {
  // const [data] = useState(qualityData);

  const dispatch = useDispatch();
  const location = useLocation();
  const slug = location.pathname === "/" ? "" : location.pathname.replace(/^\//, "");

  const data = useSelector((s) => s.pages.dataBySlug?.[slug] || null);
  const loading = useSelector((s) => s.pages.loading);

  // Fetch page data on mount
  useEffect(() => {
    dispatch(fetchPageBySlug(slug));
  }, [dispatch, slug]);

  // console.log("quality data", data)

  // Loading and error UI
  if (loading && !data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          <div className="mt-3 text-gray-700">Loading page content…</div>
        </div>
      </div>
    );
  }

  if (!loading && !data) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold">No content available.</p>
          <p className="mt-2 text-sm text-gray-600">If this persists, please check the API or click retry.</p>
          <div className="mt-4">
            <button
              onClick={() => dispatch(fetchPageBySlug(slug))}
              className="px-4 py-2 bg-[#C64827] text-white rounded"
            >Retry</button>
          </div>
        </div>
      </div>
    );
  }



  //   const totalSamples = data.years.reduce((s, y) => s + (y.total || 0), 0);
  //   const avgCompliance = (
  //     data.years.reduce((s, y) => s + y.compliance, 0) / data.years.length
  //   ).toFixed(2);

  const totalSamples = 512
  const avgCompliance = 98.6




  return (
    <div className="min-h-screen bg-white">
      <HeroSection hero={data.hero} />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard title="कुल परीक्षण" value={totalSamples} hint="सैंपल टेस्ट किए गए" />
          <StatsCard title="औसत अनुपालन" value={`${avgCompliance}%`} hint="वार्षिक अनुपालन प्रतिशत" />
          <div>
            <PDFDownload pdf={data.pdfs[0]} />
          </div>
        </div>

        {/* Table + Intro + Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MarketingTable rows={data.years} />

          <div className="space-y-4">
            <div className="bg-white rounded-md p-4 border shadow-sm">
              <h4 className="text-lg font-semibold text-yellow-900">गुणवत्ता विवरण</h4>
              <p className="mt-2 text-sm text-gray-700">{data.page.intro}</p>
            </div>

            {/* <div className="bg-white rounded-md p-4 border shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-semibold text-yellow-900">गैलरी</h4>
                <a href="/gallery" className="text-xl text-red-500 underline"> view all</a>
              </div>
              <Gallery images={data.gallery} />
            </div> */}
          </div>
        </div>

        {/* PDF List */}
        <div className="bg-white p-4 rounded-md border shadow-sm">
          <h3 className="text-lg font-semibold text-yellow-900">रिपोर्ट्स व प्रमाणन</h3>
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
