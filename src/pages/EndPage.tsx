import MIRKATLogo from '../assets/MIRKAT_Logo-11.png'
import { AiFillInstagram } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";

function EndPage() {
    return (
        <>
        <div className="endpage">
            <div className="direct-links">
                <div className='direct-links-sections'>
                <section className='direct-link-section'>
                    <h4 className='direct-link-title'>¿Qué hacemos?</h4>
                    <ul className='direct-links-links'>
                        <li>Quiero saber más</li>
                        <li>Nuestras acciones</li>
                        <li>Contacto</li>
                    </ul>
                </section>

                <section className='direct-link-section'>
                    <h4 className='direct-link-title'>¿Qué puedo hacer?</h4>
                    <ul className='direct-links-links'>
                        <li>Quiero saber más</li>
                        <li>Nuestras acciones</li>
                        <li>Contacto</li>
                    </ul>
                </section>
                </div>

                <div className='social-media'>
                    <h4 className='social-media-title'>Síguenos en nuestras redes sociales</h4>
                    <section className='social-media-links'>
                        <AiFillInstagram size={52}/>
                        <AiFillTwitterCircle size={52}/>
                        <AiFillFacebook size={52}/>
                    </section>

                </div>
                
            </div>
            <div className="endpage-img">
                <img src={MIRKATLogo} alt="MIRKAT Logo" className='endpage-img-logo'/>

            </div>

        </div>
        </>
    )
}

export default EndPage;