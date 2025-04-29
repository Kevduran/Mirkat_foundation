import { Dispatch, SetStateAction, useState } from 'react';
import Cookies from 'js-cookie';
import ConfirmationDialog from '../utils/ConfirmationDialog';

interface newsProps {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    showPopup: (message: string) => void;
}

function News({setIsLoading, showPopup} : newsProps) {
    const [file, setFile] = useState<FormData | null>(null);
    const [title, setTitle] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) {
            console.error('No file selected');
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
            return;
        };

        if (!title || !text) {
            showPopup('Falta completar el titulo o el texto de la noticia');
            return;
        };

        console.log(file);
        const storedToken = Cookies.get('authToken');
        const res = await fetch("http://localhost:3000/news/add/image", {
            method: "POST",
            headers: {
                "authorization": `${storedToken}`,
            },
            body: file,

        });

        const data: any = await res.json();
        console.log(data);

        const res2 = await fetch("http://localhost:3000/news/add", {
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
        const data2: any = await res2.json();
        console.log(data2);

        setIsLoading(false);
        showPopup('Noticia publicada');
    };



    return (
        <>
        <div className="news-container">
        <h1 className='admin-titles'>Redacción de Noticias</h1>
        <form className='news-form' onSubmit={handleSubmit}>
          <input type="text" className='news-input' placeholder='Título de la noticia' onChange={handleTitleChange}></input>
          <textarea className='news-textarea' placeholder='Texto de la noticia' onChange={handleTextChange}></textarea>
          <input type="file" className='file-input' placeholder='Imagen de la noticia' onChange={handleUpload}></input>
          <button type="submit" className='upload-button'>Publicar noticia</button>
        </form>
        

      </div>
        </>
    )

}


export default News;