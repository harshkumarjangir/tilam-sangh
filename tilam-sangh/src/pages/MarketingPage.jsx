// pages/MarketingPage.jsx
import React, { useEffect, useState } from "react";
import MarketingTable from "../components/marketing/MarketingTable";
import PDFDownload from "../components/marketing/PDFDownload";
import Gallery from "../components/marketing/Gallery";
import StatsCard from "../components/marketing/StatsCard";

// import marketingData from "../data/marketingData.json"
import HeroSection from "../components/infrastructure/HeroSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchPageBySlug } from "../redux/slices/pagesSlice";
import { useLocation } from "react-router-dom";

export default function MarketingPage() {
  // const [data, setData] = useState(marketingData);
  // console.log("data", data?.hero);

  const dispatch = useDispatch();
  const location = useLocation();
  const slug = location.pathname === "/" ? "" : location.pathname.replace(/^\//, "");

  const data = useSelector((s) => s.pages.dataBySlug?.[slug] || null);
  const loading = useSelector((s) => s.pages.loading);

  // console.log("data marketing", data)

  // Fetch page data on mount
  useEffect(() => {
    dispatch(fetchPageBySlug(slug));
  }, [dispatch, slug]);

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

  // if (!data) return <div className="p-8 text-center">Loading...</div>;

  // compute some quick totals for cards
  const totalLatest = data.years.reduce((s, y) => s + (y.total || 0), 0);
  const latestYear = data.years[data.years.length - 1]?.year || "";

  return (
    <div className="min-h-screen bg-white">
      <HeroSection hero={data?.hero} />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard title={`Last updated`} value={data.lastUpdated} hint="डेटा का अंतिम अद्यतन" />
          <StatsCard title={`कुल (सभी साल)`} value={`${totalLatest.toFixed(2)}`} hint="मेट्रिक टन" />
          <div>
            <PDFDownload pdf={data.pdfs[0]} />
          </div>
        </div>

        {/* table + gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MarketingTable rows={data.years} />
          <div className="space-y-4">
            <div className="bg-white rounded-md p-4 border shadow-sm">
              <h4 className="text-lg font-semibold text-yellow-900">विवरण</h4>
              <p className="mt-2 text-sm text-gray-700">{data.page.intro}</p>
              <p className="mt-3 text-sm text-gray-600">अधिक जानकारी के लिए PDF डाउनलोड करें।</p>
            </div>

            {/* <div className="bg-white rounded-md p-4 border shadow-sm">
              <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold text-yellow-900">गैलरी</h4>
                <a href="/gallery" className="text-xl text-red-500 underline"> view all</a>
              </div>
              <div className="mt-3">
                <Gallery images={data.gallery} />
              </div>
            </div> */}
          </div>
        </div>

        {/* all pdfs list */}
        <div className="bg-white p-4 rounded-md border shadow-sm">
          <h3 className="text-lg font-semibold text-yellow-900">रिपोर्ट्स और अभिलेख</h3>
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
