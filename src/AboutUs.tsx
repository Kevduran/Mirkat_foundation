import Navbar from './pages/Navbar';
import EndPage from './pages/EndPage';

const AboutUs = () => {
  return (
    <>
      <Navbar />

      <body style={{backgroundImage: `url('./src/assets/IMG_9414.jpg')`, backgroundSize: 'cover'}}>

      <div style={{backgroundColor: 'rgba(255, 255, 255, 0.75)'}}>

      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', maxWidth: '60%', margin: 'auto', fontFamily: 'Arial, sans-serif',
      backgroundColor: 'rgba(255, 255, 255,0.85)', opacity: '100%'}}>
        <h1 style={{maxWidth:'100%', textAlign: 'center', color:'rgba(96, 76, 158,1)'}}>Acerca de nosotros</h1>
        
        <section
  style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '100px',
    gap: '2rem', // separación entre visión y misión
    flexWrap: 'wrap', // por si el espacio es pequeño
  }}
>
  {/* Visión */}
  <section
    style={{
      flex: '1',
      maxWidth: '50%',
      backgroundColor: 'rgba(240, 99, 117, 0.75)',
      padding: '2rem',
      borderRadius: '15px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}
  >
    <section
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '1rem',
      }}
    >
      <img
        src="./src/assets/estrella.png"
        alt="Suricatas"
        style={{
          height: '2rem',
          borderRadius: '1rem',
        }}
      />
      <h2
        style={{
          fontSize: '2rem',
          color: '#333',
          margin: 0,
        }}
      >
        Visión
      </h2>
    </section>
    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '800px' }}>
      Ser una Fundación dedicada a la educación alternativa enfocada en enseñarle a niños y jóvenes a evolucionar su
      pensamiento para crear un mundo diferente a través de la metodología STEAM (Science, Technology, Engineering, Arts and Mathematics).
    </p>
  </section>

  {/* Misión */}
  <section
    style={{
      flex: '1',
      maxWidth: '50%',
      backgroundColor: 'rgba(2, 156, 153, 0.75)',
      padding: '2rem',
      borderRadius: '15px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}
  >
    <section
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '1rem',
      }}
    >
      <img
        src="./src/assets/estrella.png"
        alt="Suricatas"
        style={{
          height: '2rem',
          borderRadius: '1rem',
        }}
      />
      <h2
        style={{
          fontSize: '2rem',
          color: '#333',
          margin: 0,
        }}
      >
        Misión
      </h2>
    </section>
    <p style={{ fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '800px' }}>
      Nuestro objetivo es crear programas interactivos y estimulantes en diversos temas como la robótica y otras ramas de la ciencia y la tecnología,
      para servir como una actividad complementaria en escuelas y universidades.
    </p>
  </section>
</section>



        {/* Meerkats */}
        <section style={{display: 'flex', flexDirection: 'row', alignItems: 'center', opacity: '100px',
          paddingTop: '100px'
        }}>
        <img
            src="/img/mirkats.jpg"
            alt="Suricatas"
            style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: '1rem',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            marginBottom: '2rem',
            maxHeight: "300px"
        }}
        />
        <section style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', paddingLeft: '30px'}}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'black' }}>Meerkats</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'black' }}>
            Los suricatos africanos son tutores pacientes con sus cachorros, y les enseñan a tener cuidado al manipular escorpiones peligrosos que son una de sus presas principales.
            <br /><br />
            Los suricatos adultos llevan escorpiones muertos a sus crías, y conforme crecen sus cachorros, reciben cada vez más presas vivas, a menudo sin el aguijón.
            <br /><br />
            Por fin, llega la graduación, y los animales jóvenes reciben presas intactas.
            <br /><br />
            <em>– Alex Thorton, University of Cambridge – National Geographic</em>
          </p>
        </section>
        </section>

        {/* Imagen y frase final */}
        <section style={{ textAlign: 'center', marginTop: '4rem' }}>

          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#0c5d67',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            EL CAMBIO EMPIEZA EDUCÁNDOSE
          </h2>
        </section>
      </div>

      <EndPage />
      </div>
      </body>
    </>
  );
};

export default AboutUs;
