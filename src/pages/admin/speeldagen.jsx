"use client";
import BaseLayout from "@/layout/BaseLayout";
import AdminPopup from "@/components/Popup";
import "@/styles/style.css";
import { useRouter } from "next/navigation";
import "reactjs-popup/dist/index.css";
import SpeelDagForm from "@/components/admin/speeldag/CreateSpeeldagForm";
import WedstrijdForm from "@/components/admin/wedstrijd/CreateWedstrijd";
import WedstrijdAdmin from "@/components/admin/wedstrijd/wedstrijdAdmin";

import {
  getSpeeldagen,
} from "../../components/api_calls/call";
import React, { useState, useEffect } from "react";
import PasSpeeldagAan from "@/components/admin/speeldag/PasSpeeldagAan";

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
                  popupContent={PasSpeeldagAan(speeldag.schiftingsvraag,speeldag.schiftingsantwoord,speeldag.startDatum,speeldag.eindDatum,speeldag._id)}
                  triggerButtonName="pas aan"
                />
                <AdminPopup
                  popupContent={WedstrijdForm(speeldag._id)}
                  triggerButtonName="Nieuwe wedstrijd"
                />
              </div>

              <WedstrijdAdmin
                wedstrijden={speeldag.wedstrijden}
              ></WedstrijdAdmin>
            </li>
          ))}
        </ul>
      </div>
    </BaseLayout>
  );
}
