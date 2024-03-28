"use client";
import BaseLayout from "@/layout/BaseLayout";
import AdminPopup from "@/components/Popup";
import "../../css/style.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "reactjs-popup/dist/index.css";
import SpeelDagForm from "@/components/admin/speeldag/CreateSpeeldagForm";
import { getSpeeldagen } from "../../../components/api_calls/call";
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
            <li key={speeldag.speeldagNr}>
              <div className="speeldagHead">
                <h2>Speeldag {1 + index}</h2>
                <AdminPopup
                  popupContent={SpeelDagForm({
                    schiftingsvraag: "vraag",
                    schiftingsantwoord: "antwoord",
                  })}
                  triggerButtonName="pas aan"
                />
              </div>

              <ul>
                {speeldag.wedstrijden.map((wedstrijd) => (
                  <li key={wedstrijd.id}>
                    Thuis: {wedstrijd.thuis} - Uit: {wedstrijd.weg}
                    <Link
                      href={{
                        pathname: "",
                      }}
                    >
                      Pas aan
                    </Link>
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
