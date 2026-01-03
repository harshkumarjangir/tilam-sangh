import React, { useEffect } from "react";
// import infraData from "../data/infrastructure.json";

import HeroSection from "../components/infrastructure/HeroSection";
import IntroSection from "../components/infrastructure/IntroSection";
import StatsStrip from "../components/infrastructure/StatsStrip";
import PlantsGrid from "../components/infrastructure/PlantsGrid";
import HighlightsSection from "../components/infrastructure/HighlightsSection";
import QualitySection from "../components/infrastructure/QualitySection";
import CooperativeSection from "@/components/infrastructure/CooperativeSection";
import GallerySection from "../components/infrastructure/GallerySection";
import ContactStrip from "../components/infrastructure/ContactStrip";
import PdfDownloadSection from "../components/infrastructure/PdfDownloadSection";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPageBySlug } from "../redux/slices/pagesSlice";

export default function Infrastructure() {

  const dispatch = useDispatch();
  const location = useLocation();
  const slug = location.pathname === "/" ? "" : location.pathname.replace(/^\//, "");

  const pageData = useSelector((s) => s.pages.dataBySlug?.[slug] || null);
  const loading = useSelector((s) => s.pages.loading);

  // console.log("infraData", pageData)

  useEffect(() => {
    dispatch(fetchPageBySlug(slug));
  }, [dispatch, slug]);

  // Loading and error UI
  if (loading && !pageData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          <div className="mt-3 text-gray-700">Loading page content…</div>
        </div>
      </div>
    );
  }

  if (!loading && !pageData) {
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

  const {
    hero,
    introSection,
    statsStrip,
    plantsSection,
    infrastructureHighlights,
    qualityAssurance,
    cooperativeImpact,
    pdfDownloadSection,
    gallerySection,
    contactStrip,
  } = pageData;

  return (
    <main className="min-h-screen bg-white">
      <HeroSection hero={hero} />
      <IntroSection introSection={introSection} />
      <StatsStrip statsStrip={statsStrip} />
      <PlantsGrid plantsSection={plantsSection} />
      <HighlightsSection infrastructureHighlights={infrastructureHighlights} />
      <QualitySection qualityAssurance={qualityAssurance} />
      <CooperativeSection cooperativeImpact={cooperativeImpact} />
      <PdfDownloadSection data={pdfDownloadSection} />
      <GallerySection gallerySection={gallerySection} />
      <ContactStrip contactStrip={contactStrip} />
    </main>
  );
}
