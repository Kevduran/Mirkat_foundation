import './Front.css'
import Navbar from './pages/Navbar'
import Slideshow from './pages/Slideshow'
import Testimonials from './pages/Testimonials'
import EndPage from './pages/EndPage'
import LoadingPage from './utils/loadingPage'
import { useEffect, useState, useRef } from 'react';
import { Banner } from './interfaces/banner'
import LoadingSpinner from './utils/loadingSpinner'
import { useNavigate } from 'react-router-dom'
import { FaRobot, FaChild, FaLaptopCode } from 'react-icons/fa';

interface NewsInterface {
    id: number,
    title: string,
    content: string,
    date: number,
    image_path: string,
}

function Front() {
    const [slideImages, setSlideImages] = useState<Banner[]>([]);
    const [news, setNews] = useState<NewsInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
      const newsRef = useRef<HTMLDivElement | null>(null);

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
                const response = await fetch(`${baseURL}/banner/get/all`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                    },
                });
                const data = await response.json();
                const transformedData : Banner[] = data.map((banner: any) => ({
                    id: banner.id,
                    image_path: banner.image_path.replace(/\\/g, '/'),
                    news_id: banner.id_news
                }));
                setSlideImages(transformedData);

                
                // Fetching news
                const response2 = await fetch(`${baseURL}/news/get?limit=${5}&offset=${0}`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                    },
                });
                const data2 = await response2.json();
                const transformedData2 = await data2.map((newsItem: any) => ({
                    id: newsItem.id,
                    title: newsItem.title,
                    content: newsItem.content,
                    date: newsItem.created_at,
                    image_path: newsItem.image_path.replace(/\\/g, '/'),
                }));
                setNews(transformedData2);

            } catch (error: any) {
                console.error("Error fetching data:", error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchEverything();
    }, []);

    const timeConverter = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();
    }

    if (loading) {
        return <LoadingPage />;
    }


    return (
        <>
        <Navbar/>
        {!slideImages.length ? <LoadingSpinner/> : <Slideshow slides={slideImages}/>}
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
        <div className='news-section'>
            <h1 className='news-name'>Nuestras noticias</h1>
            <h4 className='news-name-desc'>Conoce más a fondo nuestras acciones</h4>
            <div className='news-scroll-wrapper'>
                <button className="scroll-button left" onClick={() => scrollNews(-1)}>
                &#10094;
                </button>
            <section ref={newsRef} className='news-content'>

            {news.map((news: NewsInterface, index: number) => {
                const randomColor = colors[Math.floor(Math.random() * colors.length)];

                return (
                <section className='news-item' key={index} onClick={() => redirect(`/news/${news.id}`)}
                style= {{borderTop: `8px solid ${randomColor}`}}>
                <img src={`${baseURL}/${news.image_path}`} className='news-img'/>
                <h2 className='news-title'>{news.title}</h2>
                <h6 className='news-date'>{timeConverter(news.date)}</h6>
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