import React from "react";
import infraData from "../data/infrastructure.json";

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

export default function Infrastructure() {
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
  } = infraData;

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
