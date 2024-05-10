import React from "react";
import { Form, Button } from "react-bootstrap";
import { postSpeeldag } from "@/Components/api_calls/call.js";
import { useRouter } from "next/router";


export default function SpeelDagForm() {
    const router = useRouter();
    const { seizoenId } = router.query;
    function handleFormSubmit(event) {
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

      postSpeeldag(schiftingsvraag, schiftingantwoord, startDate, eindDate, seizoenId)
        .then((data) => {
          // Handle success, if needed
          console.log("Speeldag posted successfully:", data);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch((error) => {
          // Handle error, if needed
          console.error("Failed to post speeldag:", error.message);
        });
    }
    
    return (
      <>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="schiftingsVraag">
            <Form.Label>Schiftingsvraag:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Schiftingsvraag"
              name="schiftingsvraag"
            />
          </Form.Group>
          <Form.Group controlId="schiftingsAntwoord">
            <Form.Label>Schiftingsantwoord:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Schiftingsantwoord"
              name="schiftingantwoord"
            />
          </Form.Group>
          <Form.Group controlId="startdatum">
            <Form.Label>startDatum::</Form.Label>
            <Form.Control type="date" placeholder="startdatum" name="startdatum" />
          </Form.Group>
          <Form.Group controlId="startUur">
            <Form.Label>startUur:</Form.Label>
            <Form.Control type="time" placeholder="startUur" name="startUur" />
          </Form.Group>
          <Form.Group controlId="eindatum">
            <Form.Label>eindatum invullen</Form.Label>
            <Form.Control
              type="date"
              placeholder="eindatum"
              name="eindatum"
            />
          </Form.Group>
          <Form.Group controlId="einduur">
            <Form.Label>einduur invullen</Form.Label>
            <Form.Control
              type="time"
              placeholder="einduur"
              name="einduur"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </>
    );
  }
  