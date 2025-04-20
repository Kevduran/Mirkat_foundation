import React from 'react';
import Navbar from './pages/Navbar';
import EndPage from './pages/EndPage';

const AboutUs = () => {
  return (
    <>
      <Navbar />

      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>¿Quiénes somos?</h1>
        <p>
          Somos una fundación dedicada a mejorar la sociedad a través de la tecnología, la cultura y la cooperación internacional.
        </p>
        <img
          src="/img/fundacion.jpg"
          alt="Fundación"
          style={{
            maxWidth: '80%',
            marginTop: '2rem',
            borderRadius: '1rem',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          }}
        />
      </div>

      <EndPage />
    </>
  );
};

export default AboutUs;
