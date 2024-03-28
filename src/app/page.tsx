'use client'
import BaseLayout from "@/layout/BaseLayout";
import Link from "next/link";
import React, { useEffect } from "react";
import Login from "../components/Login"
// import './globals.css';

import KlassementPanel from "@/Components/KlassementPannel"
import SeizoenPanel from "@/Components/SeizoenPanel"
import WedstrijdPanel from "@/Components/WedstrijdPanel"
import "./css/Home.css"
import { useState } from "react";
import { getSpeeldagen } from "@/Components/api_calls/call";

export default function Home() {
  const [leftPanelSelected, setLeftPanelSelected] = useState(true);
  const [selectedSpeeldag, setselectedSpeeldag] = useState(1);

  function onClickButton(i){
    setselectedSpeeldag(i)
    setLeftPanelSelected(false)
  }


  let seizoen = {speeldagen:[
    {speeldagNr:1,wedstrijden:[{id:1,thuis: "ploeg a", weg: "ploeg b"},{id:2,thuis: "ploeg a", weg: "ploeg c"},{id:3,thuis: "ploeg b", weg: "ploeg d"},{id:4,thuis: "ploeg a", weg: "ploeg b"}]},
    {speeldagNr:2,wedstrijden:[{id:1,thuis: "ploeg b", weg: "ploeg a"},{id:2,thuis: "ploeg c", weg: "ploeg a"},{id:3,thuis: "ploeg d", weg: "ploeg b"},{id:4,thuis: "ploeg b", weg: "ploeg a"}]},
    {speeldagNr:3,wedstrijden:[{id:1,thuis: "ploeg a", weg: "ploeg b"},{id:2,thuis: "ploeg a", weg: "ploeg c"},{id:3,thuis: "ploeg b", weg: "ploeg d"},{id:4,thuis: "ploeg a", weg: "ploeg b"}]},
    {speeldagNr:4,wedstrijden:[{id:1,thuis: "ploeg a", weg: "ploeg b"},{id:2,thuis: "ploeg a", weg: "ploeg c"},{id:3,thuis: "ploeg b", weg: "ploeg d"},{id:4,thuis: "ploeg a", weg: "ploeg b"}]},
    {speeldagNr:5,wedstrijden:[{id:1,thuis: "ploeg a", weg: "ploeg b"},{id:2,thuis: "ploeg a", weg: "ploeg c"},{id:3,thuis: "ploeg b", weg: "ploeg d"},{id:4,thuis: "ploeg a", weg: "ploeg b"}]},
    {speeldagNr:6,wedstrijden:[{id:1,thuis: "ploeg a", weg: "ploeg b"},{id:2,thuis: "ploeg a", weg: "ploeg c"},{id:3,thuis: "ploeg b", weg: "ploeg d"},{id:4,thuis: "ploeg a", weg: "ploeg b"}]}
  ]}


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
          {leftPanelSelected ? (
          <KlassementPanel/>
        ) : (
          <WedstrijdPanel speeldag={speeldagen[selectedSpeeldag]}/>
        )}
          </div>
        </div>
      </div>
    </BaseLayout>
    </>
  );
}
