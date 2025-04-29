import { useState, useEffect, SetStateAction } from 'react';
import { Banner } from '../interfaces/banner';

interface SlideshowProps {
    slides: Banner[]
}

function Slideshow ({ slides }: SlideshowProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        setCurrentIndex(nextIndex);
    }

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <>
        <div className='slideshow-container'>
            {slides.map((slide: Banner, index: number) => (
                console.log(slide.image_path),
                <div 
                    key={index}
                    className={`slide ${index === currentIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url('http://localhost:3000/${slide.image_path}')` }}
                />
            ))}
            <button className='next-prev-button' onClick={nextSlide}>Next</button>
        </div>
        </>
    )
}

export default Slideshow;