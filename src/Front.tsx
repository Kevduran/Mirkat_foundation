import './Front.css';
import Navbar from './pages/Navbar';
import Slideshow from './pages/Slideshow';
import Testimonials from './pages/Testimonials';
import EndPage from './pages/EndPage';
import placeholder from './assets/placeholder.png';
import { allNews } from './data/newsData';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { FaRobot, FaChild, FaLaptopCode } from 'react-icons/fa';

function Front() {
  const navigate = useNavigate();
  const newsRef = useRef<HTMLDivElement | null>(null);

  const scrollNews = (direction: number) => {
    if (newsRef.current) {
      const scrollAmount = 400;
      newsRef.current.scrollBy({
        left: scrollAmount * direction,
        behavior: 'smooth',
      });
    }
  };

  const sliderItems = allNews.slice(0, 3);
  const newsItems = allNews.slice(3);

  const colors = ['#f5b718', '#927cb4', '#604c9e', '#029c99', '#f06375'];

  return (
    <>
      <Navbar />

      <Slideshow
        slides={sliderItems.map((item, index) => ({
          ...item,
          link: `/detalle/${index}`,
        }))}
      />

<div className="numbers-section">
  <section className="numbers-element">
    <FaRobot size={80} className="numbers-img" />
    <h1 className="numbers-number">120+</h1>
    <p className="numbers-description">Robots construidos por niños y niñas</p>
  </section>

  <section className="numbers-element">
    <FaChild size={80} className="numbers-img" />
    <h1 className="numbers-number">500+</h1>
    <p className="numbers-description">Niños formados en pensamiento lógico</p>
  </section>

  <section className="numbers-element">
    <FaLaptopCode size={80} className="numbers-img" />
    <h1 className="numbers-number">75%</h1>
    <p className="numbers-description">Aumento en habilidades digitales</p>
  </section>
</div>


      <div className="news-section">
        <h1 className="news-name">Nuestras noticias</h1>
        <h4 className="news-name-desc">Conoce más a fondo nuestras acciones</h4>

        <div className="news-scroll-wrapper">
          <button className="scroll-button left" onClick={() => scrollNews(-1)}>
            &#10094;
          </button>

          <section ref={newsRef} className="news-content">
          {newsItems.map((item, index) => {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <section
      className="news-item"
      key={index}
      style={{
        flex: '0 0 auto',
        borderTop: `8px solid ${randomColor}`,
        borderRadius: '0.5rem',
        backgroundColor: 'white'
      }}
    >
      <img src={item.image} className="news-img" alt={item.title} />
      <h2 className="news-title">{item.title}</h2>
      <h6 className="news-date">2024</h6>
      <p className="news-text">{item.subtitle}</p>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
  <button
    className="slide-button"
    onClick={() => navigate(`/detalle/${index + 3}`)}
    style={{
      backgroundColor: randomColor
    }}
  >
    Leer más
  </button>
</div>
    </section>
  );
})}

          </section>

          <button className="scroll-button right" onClick={() => scrollNews(1)}>
            &#10095;
          </button>
        </div>
      </div>

      <Testimonials />
      <EndPage />
    </>
  );
}

export default Front;
