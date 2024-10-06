"use client"
import React, { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import AdminPopup from "../../../../components/Popup"
import SpeelDagForm from "../../../../components/admin/speeldag/CreateSpeeldagForm"
import WedstrijdForm from "../../../../components/admin/wedstrijd/CreateWedstrijd"
import WedstrijdAdmin from "../../../../components/admin/wedstrijd/wedstrijdAdmin"

import {
  getSpeeldagen,
  beeindigSeizoen,
  patchSpeeldag,
  updateKlassementen,
} from "../../../../components/api_calls/call"

import "bootstrap/dist/css/bootstrap.min.css";
import "reactjs-popup/dist/index.css"
import "../../../styles/style.css"

import { Form, Button } from 'react-bootstrap';

export default function Speeldagen() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [speeldagen, setSpeeldagen] = useState([])

  const seizoenId = searchParams.get("seizoenId")
  console.log(seizoenId)

  useEffect(() => {
    const isAdmin = localStorage.getItem('admin')
    console.log(isAdmin)
    if (isAdmin === 'false') {
      router.push('/')
      return
    }

    getSpeeldagen()
      .then(setSpeeldagen)
      .then(console.log)
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
          <WedstrijdForm id={_id} />
        </AdminPopup>
      </div>

      <WedstrijdAdmin wedstrijden={wedstrijden} />
    </li>
  )
}

function PasSpeeldagAan({ schiftingsvraag, schiftingsantwoord, startDatum, eindDatum, speeldagId }) {
  const searchParams = useSearchParams()
  const seizoenId = searchParams.get("seizoenId")

  // TODO: how is this supposed to work?
  const formattedStartDatum = formattedDate(new Date(startDatum));
  const formattedStartUur = formattedTime(new Date(startDatum));

  const formattedEindDatum = formattedDate(new Date(eindDatum));
  const formattedEindUur = formattedTime(new Date(eindDatum));

  console.log("datum", formattedDate);
  function handlePatchSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const startdatum = formData.get("startdatum");
    const startUur = formData.get("startUur");
    const eindDatum = formData.get("eindDatum");
    const eindUur = formData.get("einduur");
    const schiftingsvraag = formData.get("schiftingsvraag");
    const schiftingantwoord = formData.get("schiftingantwoord");

    const startDate = new Date(startdatum + " " + startUur).toISOString();
    const eindDate = new Date(eindDatum + " " + eindUur).toISOString();

    patchSpeeldag(schiftingsvraag, schiftingantwoord, startDate, eindDate, speeldagId)
      .then((data) => {
        // Handle success, if needed
        console.log("Wedstrijd patched successfully:", data);
        updateKlassementen(seizoenId)
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        // Handle error, if needed
        console.error("Failed to patch wedstrijd:", error.message);
      });
  }

  return (
    <>
      <Form onSubmit={handlePatchSubmit}>
        <Form.Group controlId="schiftingsVraag">
          <Form.Label>Schiftingsvraag:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Schiftingsvraag"
            name="schiftingsvraag"
            defaultValue={schiftingsvraag}
          />
        </Form.Group>
        <Form.Group controlId="schiftingsAntwoord">
          <Form.Label>Schiftingsantwoord:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Schiftingsantwoord"
            name="schiftingantwoord"
            defaultValue={schiftingsantwoord}
          />
        </Form.Group>
        <Form.Group controlId="startdatum">
          <Form.Label>startDatum::</Form.Label>
          <Form.Control type="date" placeholder="startdatum" name="startdatum" defaultValue={formattedStartDatum} />
        </Form.Group>
        <Form.Group controlId="startUur">
          <Form.Label>startUur:</Form.Label>
          <Form.Control type="time" placeholder="startUur" name="startUur" defaultValue={formattedStartUur} format="HH:mm" />
        </Form.Group>
        <Form.Group controlId="eindDatum">
          <Form.Label>eindDatum invullen</Form.Label>
          <Form.Control
            type="date"
            placeholder="eindDatum"
            name="eindDatum"
            defaultValue={formattedEindDatum}
          />
        </Form.Group>
        <Form.Group controlId="einduur">
          <Form.Label>einduur invullen</Form.Label>
          <Form.Control
            type="time"
            placeholder="einduur"
            name="einduur"
            defaultValue={formattedEindUur}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

function formattedDate(date) {
  const localDate = new Date(date);
  const offset = localDate.getTimezoneOffset(); // Get the timezone offset in minutes
  const localISODate = new Date(localDate.getTime() - (offset * 60000)).toISOString();
  return localISODate.split('T')[0];
}

function formattedTime(date) {
  const localDate = new Date(date);
  const offset = localDate.getTimezoneOffset(); // Get the timezone offset in minutes
  const localISOTime = new Date(localDate.getTime() - (offset * 60000)).toISOString();
  return localISOTime.split('T')[1].split('.')[0];
}

