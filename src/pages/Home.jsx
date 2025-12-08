import homeData from '../data/homeData.json'

import CampaignSlider from '../components/home/CampaignSlider'
import InfoScroller from '../components/home/InfoScroller'
import SchemesSection from '../components/home/SchemesSection'
import ProgramsSection from '../components/home/ProgramsSection'
import DepartmentsSection from '../components/home/DepartmentsSection'

const Home = () => {
    return (
        <>
            <CampaignSlider data={homeData?.campaignSlider} />
            <InfoScroller data={homeData?.InfoScroller} />
            <SchemesSection />
            <ProgramsSection />
            <DepartmentsSection />
        </>

    )
}

export default Home