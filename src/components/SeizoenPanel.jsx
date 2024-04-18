import React, { useState } from "react";

export default function SeizoenPanel({ onClick, speeldagen }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClick = (index) => {
    onClick(index);
    setSelectedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <h1 id="seizoenTitle">Seizoen 24-25</h1>
      <ul id="speeldagenList">
        {speeldagen.map((_, index) => (
          <li key={index}>
            <button
              onClick={() => handleClick(index)}
              style={selectedIndex === index ? { backgroundColor: "green" } : null}
            >
              Speeldag {speeldagen.length - index}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
