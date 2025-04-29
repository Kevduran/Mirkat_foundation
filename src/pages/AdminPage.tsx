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

function AdminPage() {

  const [file, setFile] = useState<FormData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [itemId, setItemId] = useState<number>(0);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  let navigate = useNavigate();

  // Validacion de inicio de sesion
  useEffect(() => {
    const verify = async () : Promise<void> => {
      const result = await validateToken();
      if (!result) {
        navigate("/not-authorized");
      }
    }
    verify();
  }, []);

  // Callback para el refresco de banners
  const fetchBanners = useCallback(async () => {
    setIsLoading(true);
    setBanners([]);
    const bannersRes = await fetch("http://localhost:3000/banner/get/all", {
      method: "GET",
      headers: {
        "authorization": `${Cookies.get('authToken')}`,
      },
    });
    const bannersData = await bannersRes.json();
    bannersData.forEach((banner: any) => {
      setBanners((prevBanners) => [...prevBanners, { id: banner.id, image_path: banner.image_path.replace(/\\/g, '/') }]);
    });
    setIsLoading(false);

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

    if (!event.target.files || event.target.files.length === 0) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', event.target.files?.[0] , event.target.files?.[0].name);  
    setFile(formData);
  };

  // Submit de los datos de banners
  const handleSubmit = async () => {

    if (!file) {
      showPopup('No hay un archivo seleccionado');
      return;
    }

    setIsLoading(true);
    console.log(file);
    const storedToken = Cookies.get('authToken');
    const res = await fetch("http://localhost:3000/banner/add", {
      method: "POST",
      headers: {
        "authorization": `${storedToken}`,
      },
      body: file,
    });

    const data: any = await res.json();
    console.log(data);
    fetchBanners();
    setIsLoading(false);
    showPopup('Banner añadido');
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
    const res = await fetch(`http://localhost:3000/banner/delete/${itemId}`, {
      method: "DELETE",
      headers: {
        "authorization": `${storedToken}`,
      },
    });

    const data: any = await res.json();
    console.log(data);
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
      <h1 className='admin-titles'>Edición de Banners</h1>
      <input type="file" className='file-input' onChange={handleUpload}></input>
      <button onClick={handleSubmit} className='upload-button'>Subir</button>
      <h1 className='admin-titles'>Banners activos </h1>
      <div className='banners-container'>
        {banners.map((banner) => (
          <div key={banner.id} className='banner-card'>
            <img src={`http://localhost:3000/${banner.image_path}`} alt={`Banner ${banner.id}`} className='banner-image' />
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