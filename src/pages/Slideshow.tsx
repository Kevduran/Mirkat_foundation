import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Banner } from '../interfaces/banner';

interface SlideshowProps {
    slides: Banner[]
}

function Slideshow ({ slides }: SlideshowProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentItem, setCurrentItem] = useState<Banner>();
    const [fade, setFade] = useState<boolean>(true);

    let navigate = useNavigate();
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const safeEncode = (value: string | undefined): string => {
        return encodeURIComponent(value ?? '');
    }

    useEffect(() => {
        setCurrentItem(slides[0]);
    }, []);

    const nextSlide = () : void => {
        setFade(true);
        const nextIndex = (currentIndex + 1) % slides.length;
        setCurrentIndex(nextIndex);
        setCurrentItem(slides[nextIndex]);
        setTimeout(() => setFade(false), 4800);
    }

    const setSlide = (index: number) : void => {
        setFade(true);
        setCurrentIndex(index);
        setCurrentItem(slides[index]);
    }

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval)
    }, [currentIndex]);

    const nextSlideHandler = () : void => {
        setFade(true);
        const nextIndex = (currentIndex + 1) % slides.length;
        setCurrentIndex(nextIndex);
        setCurrentItem(slides[nextIndex]);
    }

    const prevSlideHandler = () : void => {
        setFade(true);
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        setCurrentIndex(prevIndex);
        setCurrentItem(slides[prevIndex]);
    }


    return (
        <>
        <div className='slideshow-container'>
                <div>
                    {currentItem?.news_id ? ( <div 
                    className={`slide ${fade ? 'fade-in' : 'fade-out'}`}
                    style={{ backgroundImage: `url(${baseURL}serve/${safeEncode(currentItem?.image_path)})`}}> 

                        {currentItem?.title ? 
                        <div className="slide-overlay">
                        <h2 className="slide-title">{currentItem.title}</h2>
                        </div> : <></>
                        }

                        <button
                        className="slide-button"
                        onClick={() => navigate(`/news/${currentItem.news_id}`)}>Ver más</button>
                        
                    </div> )
                    : 
                    (<div 
                    className={`slide ${fade ? 'fade-in' : 'fade-out'}`}
                    style={{ backgroundImage: `url(${baseURL}serve/${safeEncode(currentItem?.image_path)})` }}>

                        {currentItem?.title ? 
                        <div className="slide-overlay">
                        <h2 className="slide-title">{currentItem.title}</h2>
                        </div> : <></>
                        }
                    
                    </div>)
                    }
                    <button className='slideshow-left-arrow' onClick={() => prevSlideHandler()}><p className='p-left-arrow'>{`<`}</p></button>
                    <button className='slideshow-right-arrow' onClick={() => nextSlideHandler()}><p className='p-right-arrow'>{`>`}</p></button>
                    <div className='slide-selector-container'>
                        {slides.map((_, index) => (
                            <button className={`slide-selector ${currentIndex === index ? 'active' : ''}`}
                            onClick={() => setSlide(index)}>
                            </button>
                        ))}
                    </div>
                    
                    
                </div>
                

        </div>
        </>
    )
}

export default Slideshow;