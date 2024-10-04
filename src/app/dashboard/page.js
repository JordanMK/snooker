"use client";
import React, { useState } from 'react';

function App() {
  // State voor het bijhouden van de boodschap
  const [message, setMessage] = useState('');

  // Functie die het bericht bijwerkt bij het klikken op de knop
  const handleClick = () => {
    setMessage('Je hebt op de knop geklikt!');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welkom op mijn React-pagina!</h1>
      <button style={styles.button} onClick={handleClick}>
        Klik hier
      </button>
      {/* Toon het bericht als er op de knop is geklikt */}
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

// Eenvoudige inline stijlen
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#61dafb',
    border: 'none',
    borderRadius: '5px',
  },
  message: {
    marginTop: '20px',
    fontSize: '1.2rem',
    color: '#333',
  },
};

export default App;
