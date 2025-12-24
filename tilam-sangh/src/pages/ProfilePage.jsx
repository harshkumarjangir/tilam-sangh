import React, { useEffect } from "react";
// import profileData from "../data/profileData.json";

import HeroSection from "../components/infrastructure/HeroSection";
import StatsCard from "../components/marketing/StatsCard";
import PDFDownload from "../components/marketing/PDFDownload";
import Gallery from "../components/marketing/Gallery";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPageBySlug } from "../redux/slices/pagesSlice";

export default function ProfilePage() {

  const dispatch = useDispatch();
  const location = useLocation();
  const slug = location.pathname === "/" ? "" : location.pathname.replace(/^\//, "");

  const profileData = useSelector((s) => s.pages.dataBySlug?.[slug] || null);
  const loading = useSelector((s) => s.pages.loading);

  // console.log("profile data", profileData)

  // Fetch page data on mount
  useEffect(() => {
    dispatch(fetchPageBySlug(slug));
  }, [dispatch, slug]);

  // Loading and error UI
  if (loading && !profileData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          <div className="mt-3 text-gray-700">Loading page content…</div>
        </div>
      </div>
    );
  }

  if (!loading && !profileData) {
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
