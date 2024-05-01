'use client'
import BaseLayout from "@/layout/BaseLayout";
import Link from "next/link";
import React, { useEffect } from "react";
import Login from "../components/Login"
// import './globals.css';

import KlassementPanel from "@/Components/KlassementPannel"
import KlassementSeizoenPannel from "@/Components/KlassementSeizoenPannel";
import SeizoenPanel from "@/Components/SeizoenPanel"
import WedstrijdPanel from "@/Components/WedstrijdPanel"
import "./css/Home.css"
import { useState } from "react";
import { getSpeeldagen } from "@/Components/api_calls/call";

export default function Home() {
  const [leftPanelSelected, setLeftPanelSelected] = useState(true);
  const [selectedSpeeldag, setselectedSpeeldag] = useState(0);
  const [showklassementSeizoenPannel, setklassementSeizoenPannel] = useState(true);

  function onClickButton(i){
    setselectedSpeeldag(i)
    setklassementSeizoenPannel(false)
    setLeftPanelSelected(false)
  }

  const [speeldagen, setSpeeldagen] = useState([]);


  useEffect(() => {
    getSpeeldagen()
      .then((speeldagen) => {
        setSpeeldagen(speeldagen);
      })
      .catch((error) => {
        console.error(error.message);
      });
    },[])
    


  return (
    <>
    <BaseLayout>
      <div className="pageContainer">
        <div className="smallColumn">
          <SeizoenPanel onClick={onClickButton} speeldagen={speeldagen}/>
        </div>
        <div className="column flexColumn">
          <div className="panelNav">
            <button onClick={() => setLeftPanelSelected(true)} style={{backgroundColor: leftPanelSelected ? "#bc6c25" : "#dda15e"}}>
              Klassement
            </button>
            <button onClick={() => setLeftPanelSelected(false)} style={{backgroundColor: !leftPanelSelected ? "#bc6c25" : "#dda15e"}}>
              Wedstrijd
            </button>
          </div>
          <div>
          {showklassementSeizoenPannel ? (
            <KlassementSeizoenPannel/>
        ) : (
          <>
            {leftPanelSelected ?(
                <KlassementPanel speeldag_id={speeldagen[selectedSpeeldag]._id}/>
            ): <WedstrijdPanel speeldag_id={speeldagen[selectedSpeeldag]._id}/>
            }
          </>
        )}
          </div>
        </div>
      </div>
    </BaseLayout>
    </>
  );
}
