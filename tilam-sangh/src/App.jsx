import { Navigate, Route, Routes } from "react-router-dom"

import videoData from "./data/videoData.json";
import galleryData from "./data/galleryData.json"

import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import ContactPage from "./pages/ContactPage";
import Tenders from "./pages/Tenders"
import Video from "./pages/Video"
import GalleryPage from "./pages/GalleryPage"
import Infrastructure from "./pages/Infrastructure"
import MarketingPage from "./pages/MarketingPage";
import QualityPage from "./pages/QualityPage";
import FinancialResultPage from "./pages/FinancialResultPage";
import ProductsPage from "./pages/ProductsPage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import RTIPage from "./pages/RTIPage";
import PricesPage from "./pages/PricesPage";


const App = () => {


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home videoData={videoData.videoGallery} galleryData={galleryData}/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/tenders" element={<Tenders />} />
        <Route path="/videos" element={<Video data={videoData.videoGallery} />} />
        <Route path="/gallery" element={<GalleryPage data={galleryData} />} />
        <Route path="/infrastructure" element={<Infrastructure/>}/>
        <Route path="/marketing" element={<MarketingPage />} />
        <Route path="/quality" element={<QualityPage />} />
        <Route path="/financial-results" element={<FinancialResultPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/rti" element={<RTIPage />} />
        <Route path="/prices" element={<PricesPage />} />
       
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />

    </div>
  )
}

export default App