import { MdLanguage, MdKeyboardArrowDown } from "react-icons/md";
import MirkatLogo from '../assets/MIRKAT_Logo-01.png'
import { Link , useNavigate } from "react-router-dom";

function Navbar () {

    let navigate = useNavigate();

    const loginHandler = () : void => {
        navigate('/login')
    }

    return (
        <>
        <section className="upper-nav">
            <button className="login-button" onClick={loginHandler}>
                Iniciar sesión
            </button>
            <button className="language-button">
                <MdLanguage size={28}/>
                <h4>Idioma</h4>
                <MdKeyboardArrowDown size={30}/>
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
                <MdKeyboardArrowDown size={32}/>
            </button>
        </section>
        </>
    )
}

export default Navbar;