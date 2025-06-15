import './Front.css'
import Navbar from './pages/Navbar'
import Slideshow from './pages/Slideshow'
import Testimonials from './pages/Testimonials'
import EndPage from './pages/EndPage'
import { useEffect, useState, useRef } from 'react';
import { Banner } from './interfaces/banner'
import LoadingSpinner from './utils/loadingSpinner'
import { useNavigate } from 'react-router-dom'

interface NewsInterface {
    id: number,
    title: string,
    content: string,
    created_at: number,
    image_path: string,
}

type Achievements = {
    id: number;
    number: string;
    content: string;
    image_path: string;
}

function Front() {
    const [slideImages, setSlideImages] = useState<Banner[]>([]);
    const [news, setNews] = useState<NewsInterface[]>([]);
    const newsRef = useRef<HTMLDivElement | null>(null);
    const [achievements, setAchievements] = useState<Achievements[]>([]);

    const redirect = useNavigate();
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const scrollNews = (direction: number) => {
    if (newsRef.current) {
      const scrollAmount = 400;
      newsRef.current.scrollBy({
        left: scrollAmount * direction,
        behavior: 'smooth',
      });
    }
    };

      const colors = ['#f5b718', '#927cb4', '#604c9e', '#029c99', '#f06375'];

    useEffect(() => {

        const fetchEverything = async () => {
            try {
                // Fetching banners
                const response = await fetch(`${baseURL}banner/get/all`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                    },
                });
                const data = await response.json();
                setSlideImages(data);

                
                // Fetching news
                const response2 = await fetch(`${baseURL}news/get?limit=${5}&offset=${0}`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                    },
                });
                const data2 = await response2.json();
                setNews(data2);

                // Fetching achievements
                await fetch(`${baseURL}achievements/get/all`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json"
                    }
                }).then(response => {
                    return response.json();
                }).then(data => {
                    setAchievements(data.map((achievement: Achievements) => ({
                        id: achievement.id,
                        number: achievement.number,
                        content: achievement.content,
                        image_path: achievement.image_path.replace(/\\/g, '/')
                    })));
                })

            } catch (error: any) {
                console.error("Error fetching data:", error.message);
            }
        }
        fetchEverything();
    }, []);

    const timeConverter = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();
    }

    const safeEncode = (value: string | undefined): string => {
        return encodeURIComponent(value ?? '');
    }


    return (
        <>
        <Navbar/>
        {!slideImages.length ? <LoadingSpinner/> : <Slideshow slides={slideImages}/>}
        <div className="numbers-section">
        
        {!achievements ? <LoadingSpinner/> : achievements.map((achievement: Achievements) => (
            <section className="numbers-element" key={achievement.id}>
            <img alt='numbersimg' src={`${baseURL}${achievement.image_path}`} className="numbers-img" />
            <h1 className="numbers-number">{achievement.number}</h1>
            <p className="numbers-description">{achievement.content}</p>
            </section>
        ))}

        </div>
        <div className='news-section'>
            <h1 className='news-name'>Nuestras noticias</h1>
            <h4 className='news-name-desc'>Conoce más a fondo nuestras acciones</h4>
            <div className='news-scroll-wrapper'>
                <button className="scroll-button left" onClick={() => scrollNews(-1)}>
                &#10094;
                </button>
            <section ref={newsRef} className='news-content'>

            {!news.length ? <LoadingSpinner/> : news.map((news: NewsInterface, index: number) => {
                const randomColor = colors[Math.floor(Math.random() * colors.length)];

                return (
                <section className='news-item' key={index} onClick={() => redirect(`/news/${news.id}`)}
                style= {{borderTop: `8px solid ${randomColor}`}}>
                <img src={`${baseURL}serve/${safeEncode(news.image_path)}?width=800&quality=60`} className='news-img' loading='lazy'/>
                <h2 className='news-title'>{news.title}</h2>
                <h6 className='news-date'>{timeConverter(news.created_at)}</h6>
                <section className='news-text-container'>
                {news.content
                .split('/n/n')
                .map((paragraph, index) => (
                <p key={index} className="news-text">{paragraph}</p>
                ))}
                </section>
                <p className='news-text-truncate'>...</p>
                </section>
                )
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
    )
};

export default Front;