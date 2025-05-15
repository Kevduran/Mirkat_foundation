import './Front.css'
import placeholder from './assets/placeholder.png'
import Navbar from './pages/Navbar'
import Slideshow from './pages/Slideshow'
import Testimonials from './pages/Testimonials'
import EndPage from './pages/EndPage'
import LoadingPage from './utils/loadingPage'
import { useEffect, useState } from 'react';
import { Banner } from './interfaces/banner'
import LoadingSpinner from './utils/loadingSpinner'
import { useNavigate } from 'react-router-dom'

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

    const redirect = useNavigate();
    const baseURL = import.meta.env.VITE_API_BASE_URL;

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

        
        {[...Array(3)].map((_, index) => (
        <section className='numbers-element' key={index}>
            <img src={placeholder} className='numbers-img'/>
            <h1 className='numbers-number'>50</h1>
            <p className='numbers-description'>Was mich nicht umbringt, macht mich stärker.</p>
        </section>
        ))}

        </div>
        <div className='news-section'>
            <h1 className='news-name'>Nuestras noticias</h1>
            <h4 className='news-name-desc'>Conoce más a fondo nuestras acciones</h4>
            <section className='news-content'>

            {news.map((news: NewsInterface, index: number) => {

                return (
                <section className='news-item' key={index} onClick={() => redirect(`/news/${news.id}`)}>
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

        </div>
        <Testimonials />
        <EndPage />

        </>
    )
};

export default Front;