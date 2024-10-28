import React, { useState, useEffect } from 'react';

export default function SeizoenPanel({ onClick, speeldagen }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [speeldagStatus, setSpeeldagStatus] = useState({});

  useEffect(() => {
    const statusobj = {};

    speeldagen.forEach((speeldag) => {
      const status = localStorage.getItem(`speeldag_${speeldag._id}_online`);
      statusobj[speeldag._id] = status === 'true';
    });

    setSpeeldagStatus(statusobj);
  }, [speeldagen]);

  const handleClick = (index) => {
    onClick(index);
    setSelectedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <h1 id='seizoenTitle'>Seizoen 24-25</h1>
      <ul id='speeldagenList'>
        {speeldagen
          .slice()
          .reverse()
          .filter((speeldag) => speeldagStatus[speeldag._id])
          .map((speeldag, reversedIndex) => {
            const originalIndex = speeldagen.length - 1 - reversedIndex;
            return (
              <li key={originalIndex}>
                <button
                  onClick={() => handleClick(originalIndex)}
                  style={
                    selectedIndex === originalIndex
                      ? { backgroundColor: 'green' }
                      : null
                  }
                >
                  Speeldag {originalIndex + 1}
                </button>
              </li>
            );
          })}
      </ul>
    </>
  );
}
