import { Route, Routes } from "react-router-dom"

const App = () => {
  return (
    <div>
      <h1>Nabvar</h1>
      <Routes>
        <Route path="/" element={<h1 className="text-3xl font-bold underline">Home Page</h1>} />
        <Route path="/about" element={<h1 className="text-3xl font-bold underline">About Page</h1>} />
      </Routes>
      <div>Footer</div>

    </div>
  )
}

export default App