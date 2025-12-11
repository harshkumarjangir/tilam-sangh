import { Route, Routes } from "react-router-dom"

import videoData from "./data/videoData.json";
import galleryData from "./data/galleryData.json"

import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Tenders from "./pages/Tenders"
import Video from "./pages/Video"
import Gallery from "./pages/Gallery"

import Infrastructure from "./pages/Infrastructure"

const App = () => {


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home videoData={videoData.videoGallery} galleryData={galleryData}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tenders" element={<Tenders />} />
        <Route path="/videos" element={<Video data={videoData.videoGallery} />} />
        <Route path="/gallery" element={<Gallery data={galleryData} />} />
        <Route path="/infrastructure" element={<Infrastructure/>}/>
      </Routes>
      <Footer />

    </div>
  )
}

export default App