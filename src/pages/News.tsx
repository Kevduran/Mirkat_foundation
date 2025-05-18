import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import LoadingSpinner from '../utils/loadingSpinner';
import ConfirmationDialog from '../utils/ConfirmationDialog';

interface newsProps {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    showPopup: (message: string) => void;
}

interface NewsInterface {
    id: number,
    title: string,
    content: string,
    date: number,
    image_path: string,
}


function News({setIsLoading, showPopup} : newsProps) {
    const [file, setFile] = useState<FormData | null>(null);
    const [title, setTitle] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [isLoadingSpinner, setIsLoadingSpinner] = useState<boolean>(false);
    const [isLoading2, setIsLoading2] = useState<boolean>(false);
    const [news, setNews] = useState<NewsInterface[]>([]);
    const [index, setIndex] = useState<number>(0);
    const [newsCount, setNewsCount] = useState<number>(0);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [itemId, setItemId] = useState<number>(0);

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {

    }, [newsCount])

    useEffect(() => {
            setIsLoading2(true);
            const countRes = async () => {
              const res = await fetch(`${baseURL}news/get/count`, {
                  method: "GET",
                  headers: {
                      "content-type": "application/json",
                  },
              });
              const data = await res.json();
              setNewsCount(Math.ceil(data/5));
              }
              countRes();
            setIsLoading2(false);
    }, [])

    

    useEffect(() => {
        const fetchNews = async () => {
            setIsLoadingSpinner(true);
    
            const newsRes = await fetch(`${baseURL}news/get?limit=5&offset=${(index * 5)}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                },
            });
            const newsData = await newsRes.json();
            const transformedData = await newsData.map((newsItem: any) => ({
                id: newsItem.id,
                title: newsItem.title,
                content: newsItem.content,
                date: newsItem.created_at,
                image_path: newsItem.image_path.replace(/\\/g, '/'),
            }));
            setNews(transformedData);
    
            setIsLoadingSpinner(false);
        };
        fetchNews();
    }, [index]);

    const changeIndex = (newIndex: number) => {
        console.log(newsCount);
        if (newIndex >= 0 && newIndex < newsCount) {
            setIndex(newIndex);
        }
    }
    const timeConverter = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();
    }

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileName = event.target.files?.[0].name;
        if (!event.target.files || event.target.files.length === 0) {
            showPopup('Seleccione una imagen');
            return;
        }
        if (!fileName?.endsWith('.jpg') && !fileName?.endsWith('.png') && !fileName?.endsWith('.bmp') && !fileName?.endsWith('.jpeg') && !fileName?.endsWith('.tiff')){
            showPopup('Tipo de archivo no aceptado. Tiene que ser: jpg, png, bmp, jpeg o tiff');
            return;
        }
        const formData = new FormData();
        formData.append('image', event.target.files?.[0], event.target.files?.[0].name);
        setFile(formData);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        if (!file) {
            showPopup('Seleccione una imagen');
            setIsLoading(false);
            return;
        };

        if (!title || !text) {
            showPopup('Falta completar el titulo o el texto de la noticia');
            setIsLoading(false);
            return;
        };

        const storedToken = Cookies.get('authToken');
        const res = await fetch(`${baseURL}news/add/image`, {
            method: "POST",
            headers: {
                "authorization": `${storedToken}`,
            },
            body: file,

        });

        const data: any = await res.json();

        await fetch(`${baseURL}news/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${storedToken}`,
            },
            body: JSON.stringify({
                'title': title,
                'content': text,
                'id': data.id,
            }),
        });
        
        setText('');
        setTitle('');
        setFile(null);

        setIsLoading(false);
        showPopup('Noticia publicada');
    };

    //Delete handling 
    const handleDelete = (id: number) => {
        setItemId(id);
        setShowConfirmation(true);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
        setItemId(0);
    };
    
    const handleConfirmationDelete = async () => {
        setShowConfirmation(false);
        setIsLoading2(true);
        const storedToken = Cookies.get('authToken');
        const res = await fetch(`${baseURL}news/delete/${itemId}`, {
          method: "DELETE",
          headers: {
            "authorization": `${storedToken}`,
          },
        });
    
        const data: any = await res.json();
        if (data.status === 500) {
          showPopup('Error al eliminar la noticia');
          setIsLoading2(false);
          return;
        }
        setItemId(0);
        setIsLoading2(false);
        setIndex(index);
        showPopup('Banner borrado');
    
      };
    

    if (isLoading2){
        return <LoadingSpinner />
    }

    return (
        <>
        <div className="news-container">
        <h1 className='admin-titles'>Redacción de Noticias</h1>
        <form className='news-form' onSubmit={handleSubmit}>
          <input type="text" className='news-input' placeholder='Título de la noticia' onChange={handleTitleChange}></input>
          <label className='anotations'>Agregar un /n/n despues de cada parrafo para que el sistema haga un salto de linea</label>
          <textarea className='news-textarea' placeholder='Texto de la noticia' onChange={handleTextChange}></textarea>
          <input type="file" className='file-input' placeholder='Imagen de la noticia' onChange={handleUpload}></input>
          <button type="submit" className='upload-button'>Publicar noticia</button>
        </form>
        <h1 className='admin-titles'>Noticias activas</h1>
        <section className='news-content'>

        
        {isLoadingSpinner ? <LoadingSpinner /> : news.map((news: NewsInterface, index: number) => {

            return (
            <section className='news-item-admin' key={index}>
            <h1 className='news-title-admin'> ID: {news.id}</h1>
            <img src={`${baseURL}${news.image_path}`} className='news-img'/>
            <h2 className='news-title-admin'>{news.title}</h2>
            <h6 className='news-date-admin'>{timeConverter(news.date)}</h6>
            <section className='news-text-admin-container'>
            <p className='news-text-admin'>{news.content}</p>
            </section>
            
            <button className='delete-button' onClick={() => handleDelete(news?.id)}>Eliminar</button>
            </section>
            )
            })}
        </section>

        <section className='news-pages-section'>
        {index === 0 ? <></> : <button className='prev-next-button' onClick={() => changeIndex(index - 1)}><FaAngleLeft size={24}/></button>}
        <h1 className='actual-index'>{index + 1}</h1>
        {index === (newsCount - 1) ? <></> : <button className='prev-next-button' onClick={() => changeIndex(index + 1)}><FaAngleRight size={24}/></button>}
        </section>

        {showConfirmation ? <ConfirmationDialog 
                              onClose={handleCancelDelete}  
                              onConfirm={handleConfirmationDelete} 
                              title="Confirmación" 
                              message="¿Estás seguro de que deseas eliminar este banner?" /> : null}
        

      </div>
        </>
    )

}


export default News;