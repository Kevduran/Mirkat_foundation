import '../AdminPage.css';
import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router";
import { validateToken } from '../utils/authValidation';
import LoadingPage from '../utils/loadingPage';
import { Banner } from '../interfaces/banner';
import News from './News';
import ConfirmationDialog from '../utils/ConfirmationDialog';
import PopupMessage from '../utils/PopupMessage';
import LoadingSpinner from '../utils/loadingSpinner';

function AdminPage() {

  const [file, setFile] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingSpinner, setIsLoadingSpinner] = useState<boolean>(false);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [itemId, setItemId] = useState<number>(0);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [newsId, setNewsId] = useState<number>(0);

  let navigate = useNavigate();

  const baseURL = import.meta.env.VITE_API_BASE_URL;


  // Validacion de inicio de sesion | Fetch de banner count
  useEffect(() => {
    setIsLoading(true);
    const verify = async () : Promise<void> => {
      const result = await validateToken();
      if (!result) {
        navigate("/not-authorized");
      }
    }
    verify();

    setIsLoading(false);
  }, []);

  // Callback para el refresco de banners
  const fetchBanners = useCallback(async () => {
    setIsLoadingSpinner(true);
    setBanners([]);
    const bannersRes = await fetch(`${baseURL}banner/get/all`, {
      method: "GET",
      headers: {
        "authorization": `${Cookies.get('authToken')}`,
      },
    });
    const bannersData = await bannersRes.json();
    bannersData.forEach((banner: any) => {
      setBanners((prevBanners) => [...prevBanners, { id: banner.id, image_path: banner.image_path.replace(/\\/g, '/'), news_id: banner.id_news }]);
    });
    setIsLoadingSpinner(false);

  }, []);
  
  // Para refrescar el cambio de banners
  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  
  // Manejo del popup
  const showPopup = (message: string ) : void => {
    setMessage(message);
    setIsPopupVisible(true);
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 3000);
  }

  /*Funcion para el handling del boton de banners*/
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {

    const fileName = event.target.files?.[0].name;

    if (!event.target.files || event.target.files.length === 0) {
      showPopup('No hay un archivo seleccionado');
      return;
    }

    if (!fileName?.endsWith('.jpg') && !fileName?.endsWith('.png') && !fileName?.endsWith('.bmp') && !fileName?.endsWith('.jpeg') && !fileName?.endsWith('.tiff')){
      showPopup('Tipo de archivo no aceptado. Tiene que ser: jpg, png, bmp, jpeg o tiff');
      return;

    }

    const formData = new FormData();
    formData.append('image', event.target.files?.[0] , event.target.files?.[0].name);  
    setFile(formData);
  };

  const handleNewsIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewsId(parseInt(event.target.value));
  }

  // Submit de los datos de banners
  const handleSubmit = async () => {

    if (!file) {
      showPopup('No hay un archivo seleccionado');
      setFile(null);
      return;
    }


    setIsLoading(true);

    // Insert the image
    const storedToken = Cookies.get('authToken');
    const res = await fetch(`${baseURL}banner/add`, {
      method: "POST",
      headers: {
        "authorization": `${storedToken}`,
      },
      body: file,
    });
    const data: any = await res.json();

      // Add id of the news to the banner
      const res2 = await fetch(`${baseURL}banner/add/id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `${storedToken}`,
        },
        body: JSON.stringify({
          'newsid' : newsId,
          'id': data.id,
        })
      });
      const data2: any = await res2.json();

      if (data2.error === 'News not found') {
        showPopup('ID de la noticia no encontrada, no se añadio el banner');
      } else {
        showPopup('Banner añadido');
      }

    fetchBanners();
    setFile(null);
    setNewsId(0);
    setIsLoading(false);
    
  };

  // De aqui las funciones para el manejo del delete de banners

  const handleDelete = (id: number) => {
    setItemId(id);
    setShowConfirmation(true);
  };

  const handleConfirmationDelete = async () => {
    setShowConfirmation(false);
    setIsLoading(true);
    const storedToken = Cookies.get('authToken');
    const res = await fetch(`${baseURL}banner/delete/${itemId}`, {
      method: "DELETE",
      headers: {
        "authorization": `${storedToken}`,
      },
    });

    const data: any = await res.json();
    if (data.status === 500) {
      showPopup('Error al eliminar el banner');
      setIsLoading(false);
      return;
    }

    fetchBanners();
    setItemId(0);
    setIsLoading(false);
    showPopup('Banner borrado');

  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setItemId(0);
  };  

  const handleLogout = () : void => {
    Cookies.remove('authToken');
    navigate('/')
  }

  // Loading page
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
    <div className='upper-nav'>
      <button className='logout-button' onClick={handleLogout}>Cerrar sesión</button>
    </div>
    <PopupMessage 
      message={message} 
      isVisible={isPopupVisible}
      onClose={() => setIsPopupVisible(false)} 
      duration={3000}/>
    <div>
      <h1 className='admin-titles'>Adición de Banners</h1>

      <section className='banner-upload-section'>
      <input type="file" className='file-input' onChange={handleUpload}></input>
      <label className='anotations'>Agregar ID de la noticia si se quiere que dicho banner redirija a la noticia</label>
      <input type="text" className='news-input' placeholder='ID de la noticia' onChange={handleNewsIdChange}></input>
      <button onClick={handleSubmit} className='upload-button'>Subir</button>
      </section>

      <h1 className='admin-titles'>Banners activos </h1>
      <div className='banners-container'>
        {banners.length === 0 && !isLoadingSpinner ? <p className='no-banners'>No hay banners activos</p> : null}
        {isLoadingSpinner ? <LoadingSpinner /> : banners.map((banner) => (
          <div key={banner.id} className='banner-card'>
            <img src={`${baseURL}${banner.image_path}`} alt={`Banner ${banner.id}`} className='banner-image' />
            {banner.news_id ? <h2 className='banner-title'>ID de noticia: {banner.news_id}</h2> : <h2 className='banner-title-none'>Sin noticia asociada</h2>}
            <button className='delete-button' onClick={() => handleDelete(banner.id)}>Eliminar</button>
          </div>
        ))}
      </div>

      <News setIsLoading={setIsLoading} showPopup={showPopup}/>
      
      
      {showConfirmation ? <ConfirmationDialog 
                              onClose={handleCancelDelete}  
                              onConfirm={handleConfirmationDelete} 
                              title="Confirmación" 
                              message="¿Estás seguro de que deseas eliminar este banner?" /> : null}
      
    </div>

    </>
    
  );
}

export default AdminPage;