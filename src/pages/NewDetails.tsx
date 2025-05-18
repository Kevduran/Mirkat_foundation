import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import EndPage from "./EndPage";
import LoadingSpinner from "../utils/loadingSpinner";
import '../NewDetails.css'

interface NewsInterface {
    title: string,
    content: string,
    date: number,
    image_path: string,
}

function NewDetails() {

    const { id } = useParams();
    const [news, setNews] = useState<NewsInterface | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [notFound, setNotFound] = useState<boolean>(false);

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const timeConverter = (timestamp: number | undefined) => {
        const date = new Date((timestamp ?? 0) * 1000);
        return date.toLocaleString();
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const res = await fetch(`${baseURL}news/get/by-id?id=${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data: any = await res.json();
            
            if (!data) {
                setNotFound(true);
                setIsLoading(false);
                return;
            }
            const transformedData: NewsInterface = {
                title: data.title,
                content: data.content,
                date: data.created_at,
                image_path: data.image_path.replace(/\\/g, '/')
            }

            setNews(transformedData);
            setIsLoading(false);

        }
        fetchData();
    }, [])

    if (notFound) {
        return (
            <>
            <h1 className="news-title main">Noticia no encontrada</h1>
            </>
        )
    }

  return (
    <>
    <Navbar />
    {isLoading ? <LoadingSpinner /> : 
    <div className="news-details-container">
        <h1 className="news-title-main">{news?.title}</h1>
        <h6 className="news-date-main">{timeConverter(news?.date)}</h6>
        <img src={`${baseURL}${news?.image_path}`} className="news-image-main"/>
        {news?.content
        .split('/n/n')
        .map((paragraph, index) => (
            <p key={index} className="news-text-main">{paragraph}</p>
        ))}
        
    </div> }
    <EndPage />

    </>
  );
}
export default NewDetails;