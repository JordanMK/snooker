"use client"
import React, { useEffect } from "react"
import "../globals.css"

import KlassementPanel from "@/components/KlassementPanel"
import KlassementSeizoenPannel from "@/components/KlassementSeizoenPannel"
import SeizoenPanel from "@/components/SeizoenPanel"
import WedstrijdPanel from "@/components/WedstrijdPanel"
import "@/styles/Home.css"
import { useState } from "react"
import { getSpeeldagen } from "@/components/api_calls/call"

export default function Home() {
  const [leftPanelSelected, setLeftPanelSelected] = useState(true)
  const [selectedSpeeldag, setselectedSpeeldag] = useState(0)
  const [showklassementSeizoenPannel, setklassementSeizoenPannel] = useState(true)
  const [speeldagen, setSpeeldagen] = useState([])

  function onClickButton(i) {
    setselectedSpeeldag(i)
    setklassementSeizoenPannel(false)
    setLeftPanelSelected(false)
  }

  useEffect(() => {
    getSpeeldagen()
      .then(setSpeeldagen)
      .catch(error => console.error(error.message))
  }, [])

  return (
    <>

      <div className="pageContainer">
        <div className="smallColumn">
          <SeizoenPanel onClick={onClickButton} speeldagen={speeldagen} />
        </div>
        <div className="column flexColumn">
          <div className="panelNav">
            <button onClick={() => setLeftPanelSelected(true)} style={{ backgroundColor: leftPanelSelected ? "#bc6c25" : "#dda15e" }}>
              Klassement
            </button>
            <button onClick={() => setLeftPanelSelected(false)} style={{ backgroundColor: !leftPanelSelected ? "#bc6c25" : "#dda15e" }}>
              Wedstrijd
            </button>
          </div>
          <div>
            {console.log("speeldagen", speeldagen.seizoenID)}
            {showklassementSeizoenPannel ? (
              <KlassementSeizoenPannel seizoen_id={speeldagen.seizoenID} />
            ) : (
              <>
                {leftPanelSelected ? (
                  <KlassementPanel speeldag_id={speeldagen[selectedSpeeldag]._id} />
                ) : <WedstrijdPanel speeldag_id={speeldagen[selectedSpeeldag]._id} />
                }
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
