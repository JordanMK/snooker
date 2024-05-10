import React, { useState } from "react";
import { deleteWedstrijd,pas } from "../../api_calls/call";
import AdminPopup from "@/components/Popup";
import PasWedstrijdAan from "@/components/admin/wedstrijd/PasWedstrijdAan";


export default function WedstrijdAdmin({ wedstrijden, seizoenID }) {
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
            <AdminPopup
              popupContent={PasWedstrijdAan(
                wedstrijd._id,
                wedstrijd.thuis,
                wedstrijd.uit,
                wedstrijd.datum,
                wedstrijd.resultaat,
                seizoenID
              )}
              triggerButtonName="Pas aan"
            />
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
