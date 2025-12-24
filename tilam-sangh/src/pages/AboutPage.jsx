import React, { useEffect, useState } from "react";
// import aboutData from "../data/aboutData.json";

import HeroSection from "../components/infrastructure/HeroSection";
import PDFDownload from "../components/marketing/PDFDownload";
import Gallery from "../components/marketing/Gallery";

import AboutSection from "../components/about/AboutSection";
import LeadershipGrid from "../components/about/LeadershipGrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchPageBySlug } from "../redux/slices/pagesSlice";
import { useLocation } from "react-router-dom";

export default function AboutPage() {
  // const [data] = useState(aboutData);

  const dispatch = useDispatch();
  const location = useLocation();
  const slug = location.pathname === "/" ? "" : location.pathname.replace(/^\//, "");

  const data = useSelector((s) => s.pages.dataBySlug?.[slug] || null);
  const loading = useSelector((s) => s.pages.loading);

  // console.log("about data", data)

  //Fetch page data on mount
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
        {/* <section className="bg-white p-6 border rounded shadow-sm">
          <h2 className="text-xl font-semibold text-yellow-900 mb-4">
            दस्तावेज़ व अभिलेख
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {data.pdfs.map((pdf) => (
              <PDFDownload key={pdf.id} pdf={pdf} />
            ))}
          </div>
        </section> */}

        {/* GALLERY */}
        {/* <section>
           <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-semibold text-yellow-900">गैलरी</h4>
                <a href="/gallery" className="text-xl text-red-500 underline"> view all</a>
              </div>
          <Gallery images={data.gallery} />
        </section> */}

      </main>
    </div>
  );
}
