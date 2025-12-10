import { Route, Routes } from "react-router-dom"

import videoData from "./data/videoData.json";

import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Tenders from "./pages/Tenders"
import Video from "./pages/Video"


const App = () => {


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home videoData={videoData.videoGallery} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tenders" element={<Tenders />} />
        <Route path="/videos" element={<Video data={videoData.videoGallery} />} />
      </Routes>
      <Footer />

    </div>
  )
}

export default App