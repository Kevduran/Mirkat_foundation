import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Front from './Front'
import AboutUs from './AboutUs'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
