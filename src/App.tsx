import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Front from './Front';
import AboutUs from './AboutUs';
import Detalle from './Detalle'; // Asegúrate de importar este componente

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Front />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/detalle/:id" element={<Detalle />} /> {/* NUEVA RUTA */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
