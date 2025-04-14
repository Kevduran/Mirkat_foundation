import { MdLanguage, MdKeyboardArrowDown } from "react-icons/md";
import MirkatLogo from '../assets/MIRKAT_Logo-01.png'

function Navbar () {

    return (
        <>
        <section className="upper-nav">
            <button className="language-button">
                <MdLanguage size={28}/>
                <h4>Idioma</h4>
                <MdKeyboardArrowDown size={30}/>
            </button>
        </section>
        <section className="nav">
            <button className="logo-button">
                <img src={MirkatLogo} alt="Logo MIRKAT" className="mirkat-logo"/>
            </button>
            <button className="who-are-we-button">
                <h4>¿Quiénes somos?</h4>
            </button>
            <button className="how-can-you-help-button">
                <h4>¿Cómo ayudar?</h4>
                <MdKeyboardArrowDown size={32}/>
            </button>
        </section>
        </>
    )
}

export default Navbar;