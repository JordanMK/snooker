"use client";
import BaseLayout from "@/layout/BaseLayout";
import AdminPopup from "@/components/Popup";
import "../../css/style.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "reactjs-popup/dist/index.css";
import SpeelDagForm from "@/components/admin/speeldag/CreateSpeeldagForm";
import WedstrijdForm from "@/components/admin/speeldag/CreateWedstrijd";

import {
  getSpeeldagen,
  deleteWedstrijd,
} from "../../../components/api_calls/call";
import React, { useState, useEffect } from "react";
import Index from "@/components/Login";

export default function Speeldagen() {
  const [speeldagen, setSpeeldagen] = useState([]);

  useEffect(() => {
    getSpeeldagen()
      .then((fetchedSpeeldagen) => {
        console.log(fetchedSpeeldagen);
        setSpeeldagen(fetchedSpeeldagen);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);
  const router = useRouter();
  const maakSpeeldagClick = () => {
    console.log("maakSpeeldagClick");
    router.push("/admin/speeldagen/CreateSpeeldag");
  };

  const handleVerwijderClick = (wedstrijdId) => {
    if (
      window.confirm("Weet je zeker dat je deze wedstrijd wilt verwijderen?")
    ) {
      deleteWedstrijd(wedstrijdId)
        .then(() => {
          console.log("Wedstrijd successfully deleted");
          // Update state to reflect the deletion
          const updatedSpeeldagen = speeldagen.map((speeldag) => ({
            ...speeldag,
            wedstrijden: speeldag.wedstrijden.filter(
              (wedstrijd) => wedstrijd.id !== wedstrijdId
            ),
          }));
          setSpeeldagen(updatedSpeeldagen);
        })
        .catch((error) => {
          console.error("Failed to delete wedstrijd:", error.message);
        });
    }
  };
  return (
    <BaseLayout>
      <div className="header">
        <h1>Dashboard Admin</h1>
      </div>
      <AdminPopup
        popupContent={SpeelDagForm()}
        triggerButtonName="nieuw Speeldag"
      />
      <div className="speeldag">
        <ul>
          {speeldagen.map((speeldag, index) => (
            <li key={speeldag._id}>
              <div className="speeldagHead">
                <h2>Speeldag {1 + index}</h2>
                <AdminPopup
                  popupContent={SpeelDagForm({
                    schiftingsvraag: "vraag",
                    schiftingsantwoord: "antwoord",
                  })}
                  triggerButtonName="pas aan"
                />
                <AdminPopup
                  popupContent={WedstrijdForm(speeldag._id)}
                  triggerButtonName="Nieuwe wedstrijd"
                />
              </div>

              <ul>
                {speeldag.wedstrijden.map((wedstrijd) => (
                  <li key={wedstrijd.id}>
                    Thuis: {wedstrijd.thuis} - Uit: {wedstrijd.uit}
                    <button class="btn btn-light btn-sm m-1" id="pasaan">
                      Pas aan
                    </button>
                    <button
                      class="btn btn-light btn-sm m-1"
                      id="delete"
                      onClick={() => handleVerwijderClick(wedstrijd.id)}
                    >
                      Verwijder
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </BaseLayout>
  );
}
