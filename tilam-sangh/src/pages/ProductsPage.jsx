import React, { useEffect, useState } from "react";
// import productsData from "../data/productsData.json";
import HeroSection from "../components/infrastructure/HeroSection";
import PDFDownload from "../components/marketing/PDFDownload";
import StatsCard from "../components/marketing/StatsCard";
import MarketingTable from "../components/marketing/MarketingTable";
import Gallery from "../components/marketing/Gallery";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPageBySlug } from "../redux/slices/pagesSlice";

export default function ProductsPage() {
  // const [data] = useState(productsData);


  const dispatch = useDispatch();
  const location = useLocation();
  const slug = location.pathname === "/" ? "" : location.pathname.replace(/^\//, "");

  const data = useSelector((s) => s.pages.dataBySlug?.[slug] || null);
  const loading = useSelector((s) => s.pages.loading);

  // console.log("products data", data)

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

  const totalProducts = data.years.length;
  const brandedCategories = 4;

  return (
    <div className="min-h-screen bg-white">
      <HeroSection hero={data.hero} />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard
            title="कुल उत्पाद"
            value={totalProducts}
            hint="Tilam ब्रांड के अंतर्गत उपलब्ध उत्पाद"
          />
          <StatsCard
            title="उपलब्ध कैटेगरी"
            value={brandedCategories}
            hint="सरसों, सोयाबीन, मूंगफली, रिफाइंड"
          />
          <div>
            <PDFDownload pdf={data.pdfs[0]} />
          </div>
        </div>

        {/* Table + Intro + Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MarketingTable rows={data.years} />

          <div className="space-y-4">
            <div className="bg-white rounded-md p-4 border shadow-sm">
              <h4 className="text-lg font-semibold text-yellow-900">उत्पाद विवरण</h4>
              <p className="mt-2 text-sm text-gray-700">{data.page.intro}</p>
            </div>

            {/* <div className="bg-white rounded-md p-4 border shadow-sm">
              <h4 className="text-lg font-semibold text-yellow-900">गैलरी</h4>
              <Gallery images={data.gallery} />
            </div> */}
          </div>
        </div>

        {/* PDF List */}
        <div className="bg-white p-4 rounded-md border shadow-sm">
          <h3 className="text-lg font-semibold text-yellow-900">उत्पाद दस्तावेज़</h3>
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
