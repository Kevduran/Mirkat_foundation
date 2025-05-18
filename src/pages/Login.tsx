import '../Login.css';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router";
import { validateToken } from '../utils/authValidation';
import PopupMessage from '../utils/PopupMessage';

function Login() {
    const [identifier, setIdentifier] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [token, setToken] = useState<string | null>(null);
    const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    let navigate = useNavigate();

    const baseURL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const verify = async () => {
            const result = await validateToken();
            if (result) {
                navigate("/admin");
            }
        }
        verify();

    }, []);

    const showPopup = (message: string ) : void => {
        setMessage(message);
        setIsPopupVisible(true);
        setTimeout(() => {
          setIsPopupVisible(false);
        }, 3000);
      }


    const handleIdentifierChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdentifier(event.target.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!identifier || !password) {
            showPopup('Por favor, completa todos los campos.');
            return;
        }

        const res = await fetch(`${baseURL}auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "identifier": identifier,
                "password": password,
            }),
        });
        const data = await res.json();


        Cookies.set('authToken', data.token, {
            expires: 1, // Cookie expires in 1 day
            secure: true, // Only sent over HTTPS (requires HTTPS in production)
            sameSite: 'Strict', // Protects against CSRF
          });
          setToken(token);

        if (res.status === 200) {
            showPopup('Inicio de sesión exitoso! Redigiriendo...');
            setTimeout(() => {
                navigate("/admin");
            }, 3000);
        } else {
            showPopup('Hay un error en el inicio de sesión');
        }
          
        
    }


    return (
        <>
        <div className='upper-nav'>
        </div>
        <PopupMessage 
        message={message} 
        isVisible={isPopupVisible}
        onClose={() => setIsPopupVisible(false)} 
        duration={3000}/>
        <div className='login-container'>
            <div className='login-form'>
                <h1 className='login-text'>Iniciar sesión</h1>
                <form className='login-form-class'onSubmit={handleSubmit}>
                    <input className='form-input' type="text" placeholder='Usuario o email' onChange={handleIdentifierChange}/>
                    <input className='form-input' type="password" placeholder='Contraseña' onChange={handlePasswordChange}/>
                    <button className='login-button' type="submit">Iniciar sesión</button>
                </form>
                </div>
        </div>
        </>
    )
}

export default Login;