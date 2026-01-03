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
import { useDispatch, useSelector } from 'react-redux'
import { fetchPageBySlug } from '../redux/slices/pagesSlice'

const Home = ({ videoData }) => {
    const { language } = useLanguage();
    const dispatch = useDispatch();
    const slug = ""; // home page slug

    const pageData = useSelector((s) => s.pages.dataBySlug?.[slug] || null);
    const galleryPage = useSelector((s) => s.pages.dataBySlug?.['gallery'] || null);
    const videoPage = useSelector((s) => s.pages.dataBySlug?.['videos'] || null);
    const loading = useSelector((s) => s.pages.loading);

    useEffect(() => {
        dispatch(fetchPageBySlug(slug));
        // also fetch the gallery page so Home can show latest gallery content
        dispatch(fetchPageBySlug('gallery'));
        dispatch(fetchPageBySlug('videos'));
    }, [dispatch, slug]);

    // Loading and error UI
    if ( !pageData) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                    <div className="mt-3 text-gray-700">Loading page content…</div>
                </div>
            </div>
        );
    }

    // if (!loading && !pageData) {
    //     return (
    //         <div className="min-h-[60vh] flex items-center justify-center">
    //             <div className="text-center">
    //                 <p className="text-lg font-semibold">No content available.</p>
    //                 <p className="mt-2 text-sm text-gray-600">If this persists, please check the API or click retry.</p>
    //                 <div className="mt-4">
    //                     <button
    //                         onClick={() => dispatch(fetchPageBySlug(slug))}
    //                         className="px-4 py-2 bg-[#C64827] text-white rounded"
    //                     >Retry</button>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <>
            <CampaignSlider data={pageData?.campaignSlider || { slides: [], sidebar: {}, footer: {} }} />
            <InfoScroller data={pageData?.InfoScroller || { latestUpdates: [], tenders: [], news: [] }} />
            {/* <SchemesSection data={pageData?.schemes || []} /> */}
            {/* <ProgramsSection data={pageData?.programs || []} /> */}
            {/* <DepartmentsSection data={pageData?.departments || []} /> */}
            {galleryPage && <PhotoGallery data={galleryPage} />}
            {/* <PhotoGallery data={{ heading: pageData?.photoGalleryHeading || 'Photo Gallery', photoGallery: pageData?.photoGallery || [] }} /> */}
            {videoPage?.videoGallery && <VideoGallery data={videoPage?.videoGallery} />}
            {/* <BrandSlider data={pageData?.brandSlider || { logos: [] }} /> */}
        </>

    )
}

export default Home