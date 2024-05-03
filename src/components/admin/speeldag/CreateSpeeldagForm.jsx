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
      const date = formData.get("einddatum");
      const schiftingsvraag = formData.get("schiftingsvraag");
      const schiftingantwoord = formData.get("schiftingantwoord");
  
      // Call postWedstrijd function with form data and speeldagId (id)
      postSpeeldag(schiftingsvraag, schiftingantwoord, date, seizoenId)
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
          <Form.Group controlId="einddatum">
            <Form.Label>Einddatum:</Form.Label>
            <Form.Control type="date" placeholder="Einddatum" name="einddatum" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </>
    );
  }
  