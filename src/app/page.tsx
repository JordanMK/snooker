'use client'

import BaseLayout from "@/layout/BaseLayout";

import KlassementPanel from "@/Components/KlassementPannel"
import SeizoenPanel from "@/Components/SeizoenPanel"
import WedstrijdPanel from "@/Components/WedstrijdPanel"
import "./css/Home.css"
import { useState } from "react";
import FirebaseData from "../components/firebasedata";


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
    

  return (
    <>
    <BaseLayout>
      <div className="pageContainer">
        <div className="column smallColumn">
          <SeizoenPanel onClick={onClickButton} speeldagen={seizoen.speeldagen}/>
        </div>
        <div className="column flexColumn">
          <div className="panelNav">
            <button onClick={() => setLeftPanelSelected(true)} style={{backgroundColor: leftPanelSelected ? "grey" : "lightgrey"}}>
              Klassement
            </button>
            <button onClick={() => setLeftPanelSelected(false)} style={{backgroundColor: !leftPanelSelected ? "grey" : "lightgrey"}}>
              Wedstrijd
            </button>
          </div>
          <div>
          {leftPanelSelected ? (
          <KlassementPanel/>
        ) : (
          <WedstrijdPanel speeldag={seizoen.speeldagen[selectedSpeeldag]}/>
        )}
          </div>
        </div>
      </div>
    </BaseLayout>
    </>
  );
}
