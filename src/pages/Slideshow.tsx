import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Banner } from '../interfaces/banner';

interface SlideshowProps {
    slides: Banner[]
}

function Slideshow ({ slides }: SlideshowProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentItem, setCurrentItem] = useState<Banner | null>(null);
    const [fade, setFade] = useState<boolean>(true);


    let navigate = useNavigate();
    const baseURL = 'http://localhost:3000'

    useEffect(() => {
        setCurrentItem(slides[0]);
    }, []);

    const nextSlide = () => {
        setFade(true);
        const nextIndex = (currentIndex + 1) % slides.length;
        setCurrentIndex(nextIndex);
        setCurrentItem(slides[currentIndex]);
        console.log(slides[currentIndex])
        setTimeout(() => setFade(false), 4800);
    }

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval)
    }, [currentIndex]);


    return (
        <>
        <div className='slideshow-container'>
                <div>
                    {currentItem?.news_id ? ( <div 
                    className={`slide ${fade ? 'fade-in' : 'fade-out'}`}
                    style={{ backgroundImage: `url(${baseURL}/${currentItem?.image_path})`, cursor: 'pointer' }}
                    onClick={() => navigate(`/news/${currentItem.news_id}`)}/> )
                    : 
                    (<div 
                    className={`slide ${fade ? 'fade-in' : 'fade-out'}`}
                    style={{ backgroundImage: `url(${baseURL}/${currentItem?.image_path})` }}/>)
                    }
                    
                </div>
        </div>
        </>
    )
}

export default Slideshow;