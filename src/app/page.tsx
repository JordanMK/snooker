'use client'
import BaseLayout from "@/layout/BaseLayout";
import Link from "next/link";
import React from "react";
import Login from "../components/login"
// import './globals.css';

import KlassementPanel from "@/Components/KlassementPannel"
import SeizoenPanel from "@/Components/SeizoenPanel"
import WedstrijdPanel from "@/Components/WedstrijdPanel"
import "./css/Home.css"
import { useState } from "react";

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


  let user = {users:[
    {userid:1,users:[
      {plaats:1,naam:"Mateo Gheeraert",score:320, betaald: true},
      {plaats:2,naam:"Dirk Hostens",score:250 , betaald: true},
      {plaats:3,naam:"Joshua Madd",score:245 , betaald: true},
      {plaats:4,naam:"Tom Dhoine",score:230 , betaald: true},
      {plaats:5,naam:"Thijs Geeraert",score:200 , betaald: true},
      {plaats:6,naam:"Cedric Depré",score:186 , betaald: true},
      {plaats:7,naam:"Abdu Tchop",score:162 , betaald: true},
      {plaats:8,naam:"Robin Vandenbroucke",score:143 , betaald: true},
      {plaats:9,naam:"Noah Van Steenlandt",score:127 , betaald: true},
      {plaats:10,naam:"Justas Valutis",score:109 , betaald: true},
      {plaats:11,naam:"Daniil Samsonov",score:108 , betaald: true},
      ,
    ]},
    {userid:2,users:[
      {plaats:1,naam:"Mateo Gheeraert",score:320, betaald: true},
      {plaats:2,naam:"Dirk Hostens",score:250 , betaald: true},
      {plaats:3,naam:"Joshua Madd",score:245 , betaald: true},
      {plaats:4,naam:"Tom Dhoine",score:230 , betaald: true},
      {plaats:5,naam:"Thijs Geeraert",score:200 , betaald: true},
      {plaats:6,naam:"Cedric Depré",score:186 , betaald: true},
      {plaats:7,naam:"Abdu Tchop",score:162 , betaald: true},
      {plaats:8,naam:"Robin Vandenbroucke",score:143 , betaald: true},
      {plaats:9,naam:"Noah Van Steenlandt",score:127 , betaald: true},
      {plaats:10,naam:"Justas Valutis",score:109 , betaald: true},
      {plaats:11,naam:"Daniil Samsonov",score:108 , betaald: true},
      ,
    ]},
    {userid:3,users:[
      {plaats:1,naam:"Mateo Gheeraert",score:320, betaald: true},
      {plaats:2,naam:"Dirk Hostens",score:250 , betaald: true},
      {plaats:3,naam:"Joshua Madd",score:245 , betaald: true},
      {plaats:4,naam:"Tom Dhoine",score:230 , betaald: true},
      {plaats:5,naam:"Thijs Geeraert",score:200 , betaald: true},
      {plaats:6,naam:"Cedric Depré",score:186 , betaald: true},
      {plaats:7,naam:"Abdu Tchop",score:162 , betaald: true},
      {plaats:8,naam:"Robin Vandenbroucke",score:143 , betaald: true},
      {plaats:9,naam:"Noah Van Steenlandt",score:127 , betaald: true},
      {plaats:10,naam:"Justas Valutis",score:109 , betaald: true},
      {plaats:11,naam:"Daniil Samsonov",score:108 , betaald: true},
      ,
    ]},
    {userid:4,users:[
      {plaats:1,naam:"Mateo Gheeraert",score:320, betaald: true},
      {plaats:2,naam:"Dirk Hostens",score:250 , betaald: true},
      {plaats:3,naam:"Joshua Madd",score:245 , betaald: true},
      {plaats:4,naam:"Tom Dhoine",score:230 , betaald: true},
      {plaats:5,naam:"Thijs Geeraert",score:200 , betaald: true},
      {plaats:6,naam:"Cedric Depré",score:186 , betaald: true},
      {plaats:7,naam:"Abdu Tchop",score:162 , betaald: true},
      {plaats:8,naam:"Robin Vandenbroucke",score:143 , betaald: true},
      {plaats:9,naam:"Noah Van Steenlandt",score:127 , betaald: true},
      {plaats:10,naam:"Justas Valutis",score:109 , betaald: true},
      {plaats:11,naam:"Daniil Samsonov",score:108 , betaald: true},
    ]},
    {userid:5,users:[
      {plaats:1,naam:"Mateo Gheeraert",score:320, betaald: true},
      {plaats:2,naam:"Dirk Hostens",score:250 , betaald: true},
      {plaats:3,naam:"Joshua Madd",score:245 , betaald: true},
      {plaats:4,naam:"Tom Dhoine",score:230 , betaald: true},
      {plaats:5,naam:"Thijs Geeraert",score:200 , betaald: true},
      {plaats:6,naam:"Cedric Depré",score:186 , betaald: true},
      {plaats:7,naam:"Abdu Tchop",score:162 , betaald: true},
      {plaats:8,naam:"Robin Vandenbroucke",score:143 , betaald: true},
      {plaats:9,naam:"Noah Van Steenlandt",score:127 , betaald: true},
      {plaats:10,naam:"Justas Valutis",score:109 , betaald: true},
      {plaats:11,naam:"Daniil Samsonov",score:108 , betaald: true},
    ]},
    {userid:6,users:[
      {plaats:1,naam:"Mateo Gheeraert",score:320, betaald: true},
      {plaats:2,naam:"Dirk Hostens",score:250 , betaald: true},
      {plaats:3,naam:"Joshua Madd",score:245 , betaald: true},
      {plaats:4,naam:"Tom Dhoine",score:230 , betaald: true},
      {plaats:5,naam:"Thijs Geeraert",score:200 , betaald: true},
      {plaats:6,naam:"Cedric Depré",score:186 , betaald: true},
      {plaats:7,naam:"Abdu Tchop",score:162 , betaald: true},
      {plaats:8,naam:"Robin Vandenbroucke",score:143 , betaald: true},
      {plaats:9,naam:"Noah Van Steenlandt",score:127 , betaald: true},
      {plaats:10,naam:"Justas Valutis",score:109 , betaald: true},
      {plaats:11,naam:"Daniil Samsonov",score:108 , betaald: true},
    ]},
  ]}
    


  return (
    <>
    <BaseLayout>
      <div className="pageContainer">
        <div className="smallColumn">
          <SeizoenPanel onClick={onClickButton} speeldagen={seizoen.speeldagen}/>
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
          <WedstrijdPanel speeldag={seizoen.speeldagen[selectedSpeeldag]}/>
        )}
          </div>
        </div>
      </div>
    </BaseLayout>
    </>
  );
}
