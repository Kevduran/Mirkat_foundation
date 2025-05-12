import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './pages/Navbar';
import './Detalle.css';
import { allNews } from './data/newsData'; // Asegúrate de que la ruta sea correcta

const Detalle: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const index = parseInt(id ?? '0', 10);
  const slide = allNews[index];

  if (!slide) {
    return (
      <div className="detalle-page">
        <Navbar />
        <main className="detalle-content">
          <h1 className="detalle-titulo">Noticia no encontrada</h1>
          <button className="detalle-volver" onClick={() => navigate(-1)}>Volver</button>
        </main>
      </div>
    );
  }

  return (
    <div className="detalle-page">
      <Navbar />
      <main className="detalle-content">
        <img src={slide.image} alt={slide.title} className="detalle-imagen" />
        <h1 className="detalle-titulo">{slide.title}</h1>
        <h3 className="detalle-subtitulo">{slide.subtitle}</h3>
        <p className="detalle-cuerpo">{slide.body}</p>
        <button className="detalle-volver" onClick={() => navigate(-1)}>Volver</button>
      </main>
    </div>
  );
};

export default Detalle;
