"use client"
import AdminPopup from "../../../../components/Popup"
import "../../../styles/style.css"
import { useRouter, useSearchParams } from "next/navigation"
import "reactjs-popup/dist/index.css"
import SpeelDagForm from "../../../../components/admin/speeldag/CreateSpeeldagForm"
import WedstrijdForm from "../../../../components/admin/wedstrijd/CreateWedstrijd"
import WedstrijdAdmin from "../../../../components/admin/wedstrijd/wedstrijdAdmin"

import {
  getSpeeldagen,
  beeindigSeizoen,
} from "../../../../components/api_calls/call"
import React, { useState, useEffect } from "react"
import PasSpeeldagAan from "../../../../components/admin/speeldag/PasSpeeldagAan"

export default function Speeldagen() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const seizoenId = searchParams.get("seizoenId")
  console.log(seizoenId)

  const [speeldagen, setSpeeldagen] = useState([])

  useEffect(() => {
    const isAdmin = localStorage.getItem('admin')
    console.log(isAdmin)
    if (isAdmin === 'false') {
      router.push('/')
    }

    getSpeeldagen()
      .then((fetchedSpeeldagen) => {
        console.log(fetchedSpeeldagen)
        setSpeeldagen(fetchedSpeeldagen)
      })
      .catch(error => console.error(error.message))
  }, [])

  // TODO: unused
  const seizoenBeendigen = () => {
    const confirmed = window.confirm(
      "Weet je zeker dat je dit seizoen wil beendigen?"
    )
    if (confirmed) {
      beeindigSeizoen(seizoenId)
      window.alert("Vergeet niet alle spelers op niet betaald te zetten!")
    }
  }

  // TODO(urgent): called hooks count from client and server differs
  // originates from below code, pass props to child components as 
  // actual props instead of a function call

  return (
    <>
      <div className="header">
        <h1>Dashboard Admin</h1>
      </div>
      <AdminPopup triggerButtonName="Nieuwe speeldag">
        <SpeelDagForm />
      </AdminPopup>
      <div className="speeldag">
        <ul>
          {speeldagen.map((speeldag, idx) => (<Speeldag speeldag={speeldag} number={idx + 1} key={speeldag._id} />))}
          {/*
          {speeldagen.map((speeldag, index) => (
            <li key={speeldag._id}>
              <div className="speeldagHead">
                <h2>Speeldag {1 + index}</h2>
                <AdminPopup
                  popupContent={PasSpeeldagAan(
                    speeldag.schiftingsvraag,
                    speeldag.schiftingsantwoord,
                    speeldag.startDatum,
                    speeldag.eindDatum,
                    speeldag._id
                  )}
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
      */}
        </ul>
      </div>
    </>
  )
}

function Speeldag({ speeldag, number }) {
  const { schiftingsvraag, schiftingsantwoord, startDatum, eindDatum, _id, wedstrijden } = speeldag

  return (
    <li>
      <div className="speeldagHead">
        <h2>Speeldag {number}</h2>

        <AdminPopup triggerButtonName="Pas aan">
          <PasSpeeldagAan
            schiftingsvraag={schiftingsvraag}
            schiftingsantwoord={schiftingsantwoord}
            startDatum={startDatum}
            eindDatum={eindDatum}
            speeldagId={_id} />
        </AdminPopup>

        <AdminPopup triggerButtonName="Nieuwe wedstrijd">
          <WedstrijdForm id={_id} triggerButtonName="Nieuwe wedstrijd" />
        </AdminPopup>
      </div>

      <WedstrijdAdmin wedstrijden={wedstrijden} />
    </li>
  )
}
