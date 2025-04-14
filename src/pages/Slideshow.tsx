import {useState, useEffect} from 'react'

function Slideshow ({ slides }) {
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
            {slides.map((slide: string, index: number) => (
                <div 
                    key={index}
                    className={`slide ${index === currentIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${slide})` }}
                />
            ))}
            <button className='next-prev-button' onClick={nextSlide}>Next</button>
        </div>
        </>
    )
}

export default Slideshow;