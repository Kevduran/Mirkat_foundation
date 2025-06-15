import { MdOutlineLogin, MdMenu } from "react-icons/md";
import MirkatLogo from '../assets/MIRKAT_Logo-01.png'
import { Link , useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar () {

    let navigate = useNavigate();

    const loginHandler = () : void => {
        navigate('/login')
    }
    
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
        <section className="mobile-nav">
            <button className="side-bar-button" onClick={() => setIsOpen(!isOpen)}><MdMenu size={32}/></button>
            <button className="mobile-logo-button" onClick={() => navigate('/')}>
                <img src={MirkatLogo} alt="Logo MIRKAT" className="mobile-mirkat-logo"/>
            </button>
        </section>
        <section className={`side-bar ${isOpen ? 'open' : ''}`}>
        <section className="upper-nav">
            <button className="close-button" onClick={() => setIsOpen(!isOpen)}>X</button>
            <button className="login-button" onClick={loginHandler}>
                <MdOutlineLogin size={32} className="login-logo"/>
                Iniciar sesión
            </button>
        </section>
        <section className="nav">
            <button className="logo-button" onClick={() => navigate('/')}>
                <img src={MirkatLogo} alt="Logo MIRKAT" className="mirkat-logo"/>
            </button>
            <Link to="/about" className="who-are-we-button">
                <h4>¿Quiénes somos?</h4>
            </Link>
            <button className="how-can-you-help-button">
                <h4>¿Cómo ayudar?</h4>
            </button>
        </section>
        </section>

        <section className="desktop-nav">
        <section className="upper-nav">
            <button className="login-button" onClick={loginHandler}>
                <MdOutlineLogin size={32} className="login-logo"/>
                Iniciar sesión
            </button>
        </section>
        <section className="nav">
            <button className="logo-button" onClick={() => navigate('/')}>
                <img src={MirkatLogo} alt="Logo MIRKAT" className="mirkat-logo"/>
            </button>
            <Link to="/about" className="who-are-we-button">
                <h4>¿Quiénes somos?</h4>
            </Link>
            <button className="how-can-you-help-button">
                <h4>¿Cómo ayudar?</h4>
            </button>
        </section>
        </section>

        
        
        </>
    )
}

export default Navbar;