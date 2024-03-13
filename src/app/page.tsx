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
  const [selectedKlassement, setselectedKlassement] = useState(1);

  function onClickButton(i){
    setselectedSpeeldag(i)
    setselectedKlassement(i)
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

  let user = {users:[
    {userse:[{plaats:1,naam:"Daniil Samsonov",score:300}]},
    {userse:[{plaats:2,naam:"Dirk Hostens",score:250}]},
    {userse:[{plaats:3,naam:"Joshua Madd",score:245}]},
    {userse:[{plaats:4,naam:"Tom Dhoine",score:230}]},
    {userse:[{plaats:5,naam:"Thijs Geeraert",score:200}]},
    {userse:[{plaats:6,naam:"Cedric Depré",score:186}]},
    {userse:[{plaats:7,naam:"Abdu Tchop",score:162}]},
    {userse:[{plaats:8,naam:"Robin Vandenbroucke",score:143}]},
    {userse:[{plaats:9,naam:"Noah Van Steenlandt",score:127}]},
    {userse:[{plaats:10,naam:"Justas Valutis",score:109}]},
    {userse:[{plaats:11,naam:"Mateo Gheeraert",score:96}]},
    
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
          <KlassementPanel user={user.users[selectedKlassement]}/>
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
