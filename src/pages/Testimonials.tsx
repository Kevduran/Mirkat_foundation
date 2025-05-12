import { FaQuoteLeft } from "react-icons/fa";

function Testimonials() {
  const testimonialData = [
    {
      name: "Laura Méndez",
      role: "Voluntaria en Proyectos Sociales",
      text: `Participar con Mirkat ha cambiado completamente mi forma de ver el mundo. Al principio, me uní con la intención de ayudar, pero no imaginé cuánto aprendizaje recibiría a cambio. En cada comunidad, en cada actividad, descubrí la fuerza que tienen las personas cuando se sienten acompañadas y escuchadas. He sido testigo de historias conmovedoras, de avances significativos, y sobre todo, de la esperanza que se enciende cuando alguien cree en ti.`,
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Carlos Rivas",
      role: "Psicólogo comunitario",
      text: `Gracias al apoyo de Mirkat, hemos logrado acompañar emocionalmente a decenas de familias que antes no tenían acceso a ningún tipo de atención psicológica. Las jornadas que realizamos en barrios vulnerables no solo brindan herramientas terapéuticas, sino también espacios de contención y escucha que son fundamentales para reconstruir vínculos y recuperar la autoestima colectiva. Ver cómo los niños y adolescentes se abren y expresan lo que sienten es profundamente transformador.`,
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Ana Torres",
      role: "Beneficiaria de programas educativos",
      text: `Mi hija accedió a clases gratuitas que le han abierto nuevas oportunidades que antes eran impensables para nosotros. Viene de una familia humilde, y gracias a las tutorías y materiales que nos brindó Mirkat, hoy sueña con estudiar en la universidad. La dedicación de los profesores, el cariño que transmiten y el seguimiento personalizado hacen que cada niño se sienta valorado. Como madre, no puedo expresar con palabras lo agradecida que estoy por haber encontrado esta fundación.`,
      image: "https://randomuser.me/api/portraits/women/65.jpg"
    }
  ];

  return (
    <div className='testimonials'>
      {testimonialData.map((testimonial, index) => (
        <div className="testimonial" key={index}>
          <section className='testimonial-name'>
            <img
              src={testimonial.image}
              alt={testimonial.name}
              style={{ width: '96px', height: '96px', borderRadius: '50%', marginBottom: '1rem' }}
            />
            <h4 className="testimonial-personal-name">{testimonial.name}</h4>
            <h6 className="testimonial-occupation">{testimonial.role}</h6>
          </section>
          <section className='testimonial-content'>
            <FaQuoteLeft size={62} className="quotes" />
            <p className="testimonial-text">{testimonial.text}</p>
          </section>
        </div>
      ))}
    </div>
  );
}

export default Testimonials;
