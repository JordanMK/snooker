import React, { useState } from "react";
import { deleteWedstrijd } from "../../api_calls/call";

export default function WedstrijdAdmin({ wedstrijden }) {
  const handleVerwijderClick = (wedstrijdId) => {
    if (
      window.confirm("Weet je zeker dat je deze wedstrijd wilt verwijderen?")
    ) {
      deleteWedstrijd(wedstrijdId);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };
  return (
    <>
      <ul>
        {wedstrijden.map((wedstrijd) => (
          <li key={wedstrijd._id}>
            Thuis: {wedstrijd.thuis} - Uit: {wedstrijd.uit}
            <button className="btn btn-light btn-sm m-1" id="pasaan">
              Pas aan
            </button>
            <button
              className="btn btn-light btn-sm m-1"
              id="delete"
              onClick={() => handleVerwijderClick(wedstrijd._id)}
            >
              Verwijder
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
