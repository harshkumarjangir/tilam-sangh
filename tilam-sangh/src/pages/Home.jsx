import homeData from '../data/homeData.json'

import CampaignSlider from '../components/home/CampaignSlider'
import InfoScroller from '../components/home/InfoScroller'
import SchemesSection from '../components/home/SchemesSection'
import ProgramsSection from '../components/home/ProgramsSection'
import DepartmentsSection from '../components/home/DepartmentsSection'
import PhotoGallery from '../components/home/PhotoGallery'
import VideoGallery from '../components/home/VideoGallery'
import BrandSlider from '../components/home/BrandSlider'
import { useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useState } from 'react'
import { API_BASE_URL } from '../utilities/baseurl'

const Home = ({ videoData , galleryData }) => {
    const { language } = useLanguage();
      const [pageData, setPageData] = useState(null);
      console.log("pagedata",pageData);
      
      const [seo, setSeo] = useState(null);
      const [loading, setLoading] = useState(false);
      const slug =""
   useEffect(() => {
  const fetchPage = async () => {
    try {
      setLoading(true);

      const url = `${API_BASE_URL}/api/pages/${slug}`;

      const res = await fetch(url, {
        cache: "no-store", // 🔑 KEY FIX
      });

      if (!res.ok) {
        console.warn("Page API status:", res.status);
        return;
      }

      const json = await res.json();

      if (json.success) {
        setPageData(json.data);
        setSeo(json.seo);
      }
    } catch (err) {
      console.error("Page load failed", err);
    } finally {
      setLoading(false);
    }
  };

  fetchPage();
}, []); // slug empty but stable

    return (
        <>
            <CampaignSlider data={homeData?.campaignSlider} />
            <InfoScroller data={homeData?.InfoScroller} />
            {/* <SchemesSection /> */}
            {/* <ProgramsSection /> */}
            {/* <DepartmentsSection /> */}
            <PhotoGallery data={galleryData} />
            <VideoGallery data={videoData} />
            {/* <BrandSlider /> */}
        </>

    )
}

export default Home