import { useState, Dispatch, SetStateAction, useEffect, useCallback } from "react";
import LoadingSpinner from '../utils/loadingSpinner';
import Cookies from 'js-cookie';
import ConfirmationDialog from '../utils/ConfirmationDialog';


type AchievementsProps = {
    showPopup: (message: string) => void;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

type Achievement = {
    id: number;
    content: string;
    image_path: string;
}

function Achievements({showPopup, setIsLoading}: AchievementsProps) {

    const [isLoadingSpinner, setIsLoadingSpinner] = useState<boolean>(false);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [content, setContent] = useState<string>("");
    const [file, setFile] = useState<FormData | null>(null);
    const [confirmation, setConfirmation] = useState<boolean>(false);
    const [itemId, setItemId] = useState<number>(0);

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const fetchAchievements = useCallback(async () => {
        setIsLoadingSpinner(true);
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}achievements/get/all`);
            if (!res.ok) {
                showPopup("Error fetching achievements");
                setIsLoadingSpinner(false);
                return;
            }
            const data = await res.json();
            setAchievements(data.map((achievement: Achievement) => ({
                id: achievement.id,
                content: achievement.content,
                image_path: achievement.image_path.replace(/\\/g, '/')
            })))

            setIsLoadingSpinner(false);
    }, []);

    useEffect(() => {
        fetchAchievements();
    }, [fetchAchievements]);

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) : void => {
        setContent(e.target.value);
    };

        const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileName = event.target.files?.[0].name;
        if (!event.target.files || event.target.files.length === 0) {
            showPopup('Seleccione una imagen');
            return;
        }
        if (!fileName?.endsWith('.jpg') && !fileName?.endsWith('.png') && !fileName?.endsWith('.bmp') && !fileName?.endsWith('.jpeg') && !fileName?.endsWith('.tiff') && !fileName?.endsWith('.svg')) {
            showPopup('Tipo de archivo no aceptado. Tiene que ser: jpg, png, bmp, jpeg o tiff');
            return;
        }
        const formData = new FormData();
        formData.append('image', event.target.files?.[0], event.target.files?.[0].name);
        setFile(formData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) : Promise<void> => {
        e.preventDefault();
        setIsLoading(true);

        if (!file) {
            showPopup('Seleccione una imagen');
            setIsLoading(false);
            return;
        }

        if (!content) {
            showPopup('El contenido del logro no puede estar vacío');
            setIsLoading(false);
            return;
        }

        file.append('content', content);

        const storedToken = Cookies.get('authToken');
        await fetch(`${import.meta.env.VITE_API_BASE_URL}achievements/add`, {
            method: "POST",
            headers: {
                "authorization": `${storedToken}`
            },
            body: file
        }).then((res) => {
            if (!res.ok) {
                showPopup("Error al añadir el logro");
                setIsLoading(false);
                return;
            }
        })

        setFile(null);
        setContent("");
        setIsLoading(false);
        fetchAchievements();
        showPopup("Logro añadido correctamente");

    }

    const handleDelete = (id: number) : void => {
        setConfirmation(true);
        setItemId(id);
    }

    const handleCancelDelete = () : void => {
        setConfirmation(false);
        setItemId(0);
    }

    const handleConfirmationDelete = async () : Promise<void> => {
        setIsLoading(true);
        const storedToken = Cookies.get('authToken');
        await fetch(`${import.meta.env.VITE_API_BASE_URL}achievements/delete/${itemId}`, {
            method: "DELETE",
            headers: {
                "authorization": `${storedToken}`
            }
        }).then((res) => {
            if (!res.ok) {
                showPopup("Error al eliminar el logro");
                setIsLoading(false);
                return;
            }
        })

        setConfirmation(false);
        setItemId(0);
        fetchAchievements();
        setIsLoading(false);
        showPopup("Logro eliminado");
    }

    return (
        <>
        <div className="achievements-editor">
            <h1 className="admin-titles">Edicion de zona de logros</h1>
            <form className="news-form" onSubmit={handleSubmit}>
                <input type="text" className='news-input' placeholder="Texto que contendrá el logro" onChange={handleContentChange}></input>
                <label className='anotations'>Se recomienda subir imágenes PNG o SVG</label>
                <input type="file" className='file-input' placeholder='Imagen de la noticia' onChange={handleUpload}></input>
                <button type="submit" className='upload-button'>Añadir logro</button>
            </form>

            <h1 className="admin-titles">Logros activos</h1>
            <section className="achievements-container">
            {isLoadingSpinner ? <LoadingSpinner /> : achievements.map((achievement: Achievement) => {
                return (
                    <div className="achievement-item" key={achievement.id}>
                        <img src={`${baseURL}${achievement.image_path}`} className="achievement-img"/>
                        <h1 className="achievement-content">{achievement.content}</h1>
                        <button className='delete-button' onClick={() => handleDelete(achievement?.id)}>Eliminar</button>
                    </div>
                )
            })}

            </section>

            {achievements.length === 0 && !isLoadingSpinner ? <p className='no-banners'>No hay logros activos</p> : null}

            {confirmation ? <ConfirmationDialog 
                              onClose={handleCancelDelete}  
                              onConfirm={handleConfirmationDelete} 
                              title="Confirmación" 
                              message="¿Estás seguro de que deseas eliminar este banner?" /> : null}

        </div>
        </>
    )
}

export default Achievements;