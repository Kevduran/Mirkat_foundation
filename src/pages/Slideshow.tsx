import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Slideshow.css';

export type Slide = {
  image: string;
  title: string;
  subtitle: string;
  link: string;
};

type SlideshowProps = {
  slides: Slide[];
};

const Slideshow: React.FC<SlideshowProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];

  return (
    <div className="slideshow-container">
      <div
        className="slide active"
        style={{ backgroundImage: `url(${currentSlide.image})` }}
      >
        <div className="slide-overlay">
          <h2 className="slide-title">{currentSlide.title}</h2>
          <p className="slide-subtitle">{currentSlide.subtitle}</p>
          <button
            className="slide-button"
            onClick={() => navigate(currentSlide.link)}
          >
            Ver más
          </button>
        </div>
      </div>

      <button className="control-button prev" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="control-button next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Slideshow;
