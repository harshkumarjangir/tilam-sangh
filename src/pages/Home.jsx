import homeData from '../data/homeData.json'

import CampaignSlider from '../components/home/CampaignSlider'
import InfoScroller from '../components/home/InfoScroller'
import SchemesSection from '../components/home/SchemesSection'
import ProgramsSection from '../components/home/ProgramsSection'
import DepartmentsSection from '../components/home/DepartmentsSection'
import PhotoGallery from '../components/home/PhotoGallery'
import VideoGallery from '../components/home/VideoGallery'
import BrandSlider from '../components/home/BrandSlider'

const Home = () => {
    return (
        <>
            <CampaignSlider data={homeData?.campaignSlider} />
            <InfoScroller data={homeData?.InfoScroller} />
            <SchemesSection />
            <ProgramsSection />
            <DepartmentsSection />
            <PhotoGallery />
            <VideoGallery data={homeData.videoGallery} />
            <BrandSlider />
        </>

    )
}

export default Home