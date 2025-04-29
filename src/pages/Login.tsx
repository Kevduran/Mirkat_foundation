import '../Login.css';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router";
import { validateToken } from '../utils/authValidation';

function Login() {
    const [identifier, setIdentifier] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [token, setToken] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    let navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            const result = await validateToken();
            setIsLoggedIn(result);
            if (result) {
                navigate("/admin");
            }
        }
        verify();

    }, []);


    const handleIdentifierChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdentifier(event.target.value);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!identifier || !password) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const res = await fetch("http://localhost:3000/auth/login", {
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
            alert('Inicio de sesión exitoso!');
            navigate("/admin");
        }
          
        
    }


    return (
        <>
        <div className='upper-nav'>
        </div>
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