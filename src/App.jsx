import { Route, Routes } from "react-router-dom"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Tenders from "./pages/Tenders"
import Infrastructure from "./pages/Infrastructure"

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/tenders" element={<Tenders/>}/>
        <Route path="/infrastructure" element={<Infrastructure/>}/>
      </Routes>
      <Footer />

    </div>
  )
}

export default App