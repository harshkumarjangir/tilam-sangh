import React from 'react'
import CampaignSlider from '../components/home/CampaignSlider'
import homeData from '../data/homeData.json'
import InfoScroller from '../components/home/InfoScroller'

const Home = () => {
    return (
        <> 
        <CampaignSlider data={homeData?.campaignSlider} />
        <InfoScroller data={homeData?.InfoScroller}/>
         </>
        
    )
}

export default Home