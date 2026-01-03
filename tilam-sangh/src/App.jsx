import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

import videoData from "./data/videoData.json";

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
import ScrollToTop from "./components/ScrollToTop";
import { useLanguage } from "./context/LanguageContext";
import { fetchPageBySlug } from "./redux/slices/pagesSlice";
import DebugOverlay from "./components/Dev/DebugOverlay";


const RouteListener = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    // convert pathname to slug used by API
    // root path -> empty slug
    let slug = location.pathname === "/" ? "" : location.pathname.replace(/^\//, "");
    console.log("slug", slug)

    // fetch page for current route
    dispatch(fetchPageBySlug(slug));
  }, [location.pathname, dispatch]);

  return null;
}

const App = () => {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      {/* <RouteListener /> */}
      <Routes>
        <Route path="/" element={<Home videoData={videoData.videoGallery} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/tenders" element={<Tenders />} />
        <Route path="/videos" element={<Video data={videoData.videoGallery} />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/infrastructure" element={<Infrastructure />} />
        <Route path="/marketing" element={<MarketingPage />} />
        <Route path="/quality" element={<QualityPage />} />
        <Route path="/financial-results" element={<FinancialResultPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/rti" element={<RTIPage />} />
        <Route path="/prices" element={<PricesPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      {import.meta.env.VITE_NODE_ENV === "development" && <DebugOverlay />}
    </div>
  )
}

export default App