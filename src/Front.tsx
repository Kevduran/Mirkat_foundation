import './Front.css'
import placeholder from './assets/placeholder.png'
import newsimg from './assets/IMG_9348_1.jpg'
import Navbar from './pages/Navbar'
import Slideshow from './pages/Slideshow'
import Testimonials from './pages/Testimonials'
import EndPage from './pages/EndPage'
import Slide1 from './assets/IMG_9482_1.jpg'
import Slide2 from './assets/IMG_9414.jpg'
import Slide3 from './assets/IMG_9383_1.jpg'

function Front() {
    const newstext = "Nach dem Einmarsch Russlands in die Ukraine im Februar 2022 gerieten hunderte russisch-orthodoxer Priester in Schwierigkeiten, weil sie sich gegen die Haltung der russischen Behörden und die anderer Kirchenvertreter stellten, berichten Menschenrechtsaktivisten.Einige von ihnen flohen aus Angst vor Verfolgung aus dem Land oder wurden durch die von Moskau kontrollierte Russisch-Orthodoxe Kirche von der Ausübung ihres Priesteramts ausgeschlossen. Andere wurden wegen ihrer Äußerungen gegen Russlands Krieg in der Ukraine verhaftet und eingesperrt."
    const slideImages: string[] = [Slide1, Slide2, Slide3]



    return (
        <>
        <Navbar/>
        <Slideshow slides={slideImages} />
        <div className="numbers-section">

        
        {[...Array(3)].map((_, index) => (
        <section className='numbers-element'>
            <img src={placeholder} className='numbers-img'/>
            <h1 className='numbers-number'>50</h1>
            <p className='numbers-description'>Was mich nicht umbringt, macht mich stärker.</p>
        </section>
        ))}

        </div>
        <div className='news-section'>
            <h1 className='news-name'>Nuestras noticias</h1>
            <h4 className='news-name-desc'>Conoce más a fondo nuestras acciones</h4>
            <section className='news-content'>

            {[...Array(4)].map((_, index) => (
                <section className='news-item'>
                <img src={newsimg} className='news-img'/>
                <h2 className='news-title'>Lorem Ipsum</h2>
                <h6 className='news-date'>Dec 1 2024</h6>
                <p className='news-text'>{newstext}</p>
                </section>
            ))}
                
            </section>

        </div>
        <Testimonials />
        <EndPage />

        </>
    )
};

export default Front;