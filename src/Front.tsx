import './Front.css'
import placeholder from './assets/placeholder.png'
import Navbar from './pages/Navbar'
import Slideshow from './pages/Slideshow'
import Testimonials from './pages/Testimonials'
import EndPage from './pages/EndPage'
import LoadingPage from './utils/loadingPage'
import { useEffect, useState } from 'react';
import { Banner } from './interfaces/banner'

interface NewsInterface {
    title: string,
    content: string,
    date: number,
    image_path: string,
}

function Front() {
    const [slideImages, setSlideImages] = useState<Banner[] | null>(null);
    const [news, setNews] = useState<NewsInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        const fetchEverything = async () => {
            try {
                // Fetching banners
                const response = await fetch("http://localhost:3000/banner/get/all", {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                    },
                });
                const data = await response.json();
                const transformedData = await data.map((banner: any) => ({
                    id: banner.id,
                    image_path: banner.image_path.replace(/\\/g, '/'),
                }));
                setSlideImages(transformedData);
                console.log(slideImages);

                
                // Fetching news
                const response2 = await fetch(`http://localhost:3000/news/get?limit=${5}&offset=${0}`, {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                    },
                });
                const data2 = await response2.json();
                const transformedData2 = await data2.map((newsItem: any) => ({
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
        {slideImages && <Slideshow slides={slideImages}/>}
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
                <section className='news-item' key={index}>
                <img src={`http://localhost:3000/${news.image_path}`} className='news-img'/>
                <h2 className='news-title'>{news.title}</h2>
                <h6 className='news-date'>{timeConverter(news.date)}</h6>
                <p className='news-text'>{news.content}</p>
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