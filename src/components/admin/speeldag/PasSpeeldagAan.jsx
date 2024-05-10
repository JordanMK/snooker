'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from 'react-bootstrap';
import { patchSpeeldag, updateKlassementen } from '../../api_calls/call';

import { useRouter } from "next/router";

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

export default function PasSpeeldagAan(schiftingsvraag,schiftingsantwoord,startDatum,eindatum,speeldagId) {
  const router = useRouter();
  const { seizoenId } = router.query;

  const formattedStartDatum = formattedDate(new Date(startDatum));
  const formattedStartUur = formattedTime(new Date(startDatum));

  const formattedEindDatum = formattedDate(new Date(eindatum));
  const formattedEindUur = formattedTime(new Date(eindatum));


  console.log("datum", formattedDate);
  function handlePatchSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
      const startdatum = formData.get("startdatum");
      const startUur = formData.get("startUur");
      const eindDatum = formData.get("eindatum");
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
    return(
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
            <Form.Control type="date" placeholder="startdatum" name="startdatum" defaultValue={formattedStartDatum}  />
          </Form.Group>
          <Form.Group controlId="startUur">
            <Form.Label>startUur:</Form.Label>
            <Form.Control type="time" placeholder="startUur" name="startUur" defaultValue={formattedStartUur} format="HH:mm"/>
          </Form.Group>
          <Form.Group controlId="eindatum">
            <Form.Label>eindatum invullen</Form.Label>
            <Form.Control
              type="date"
              placeholder="eindatum"
              name="eindatum"
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