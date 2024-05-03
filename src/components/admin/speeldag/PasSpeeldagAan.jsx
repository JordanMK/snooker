'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from 'react-bootstrap';
import { patchSpeeldag, updateKlassementen } from '../../api_calls/call';

import { useRouter } from "next/router";



export default function PasSpeeldagAan(schiftingsvraag,schiftingsantwoord,eindDatum,speeldagId) {
  const router = useRouter();
  const { seizoenId } = router.query;
    var date = new Date(eindDatum);

  // Get the month, day, and year
  var month = date.getMonth() + 1; // Months are zero-based, so we add 1
  var day = date.getDate();
  var year = date.getFullYear();

  // Pad single digits with leading zeros
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  var formattedDate = year + '-' + month + '-' + day;

  console.log("datum", formattedDate);
  function handlePatchSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const einddatum = formData.get("einddatum");
      const schiftingsvraag = formData.get("schiftingsvraag");
      const schiftingantwoord = formData.get("schiftingantwoord");
    
    patchSpeeldag(schiftingsvraag, schiftingantwoord, einddatum, speeldagId)
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
          <Form.Group controlId="einddatum">
            <Form.Label>Einddatum:</Form.Label>
            <Form.Control type="date" placeholder="Einddatum" name="einddatum" defaultValue={formattedDate} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        </>
    )
    
}