import React, { useState } from 'react';

export default function SeizoenPanel({ onClick, speeldagen }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClick = (index) => {
    onClick(index);
    setSelectedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const filteredSpeeldagen = speeldagen.filter((speeldag) => speeldag.isOnline);

  return (
    <>
      <h1 id='seizoenTitle'>Seizoen 24-25</h1>
      <ul id='speeldagenList'>
        {filteredSpeeldagen
          .slice() // Maak een kopie van de array
          .reverse() // Omgekeerde volgorde
          .map((speeldag, reversedIndex) => {
            // Gebruik de originele index voor de nummering
            const originalIndex = speeldagen.findIndex(
              (s) => s._id === speeldag._id
            );
            return (
              <li key={speeldag._id}>
                {' '}
                {/* Gebruik de _id voor een unieke key */}
                <button
                  onClick={() => handleClick(originalIndex)}
                  style={
                    selectedIndex === originalIndex
                      ? { backgroundColor: 'green' }
                      : null
                  }
                >
                  Speeldag {originalIndex + 1} {/* Originele nummering */}
                </button>
              </li>
            );
          })}
      </ul>
    </>
  );
}
