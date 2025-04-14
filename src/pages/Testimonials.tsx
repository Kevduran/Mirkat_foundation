import { MdPeople } from "react-icons/md";
import { FaQuoteLeft } from "react-icons/fa";
import MIRKATStar from "../assets/MIRKAT_Elementos de marca-07.png"

function Testimonials() {
    return (
        <>
        <div className='testimonials'>
            {[...Array(3)].map((_, index: number) => (
                <div className="testimonial">
                <section className='testimonial-name'>
                    <MdPeople size={96}/>
                    <h4 className="testimonial-personal-name">John Doe</h4>
                    <h6 className="testimonial-occupation">Ceo @ Company Inc.</h6>
                </section>
                <section className='testimonial-content'>
                    <FaQuoteLeft size={62} className="quotes"/>
                    <p className="testimonial-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel ipsum vel justo finibus faucibus. Donec eget libero at velit pellentesque efficitur. Nulla facilisi. Nullam vel ligula vel mi faucibus convallis a at lectus. Sed vel est ac arcu placerat convallis.</p>
                </section>
                </div>        
            )) }

        </div>
        </>
    )
}

export default Testimonials;