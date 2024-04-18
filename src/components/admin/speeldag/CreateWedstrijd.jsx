import { Form, Button } from "react-bootstrap";
import { postWedstrijd } from "../../api_calls/call.js";

export default function WedstrijdForm(id) {
  function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const date = formData.get("date");
    const homeTeam = formData.get("homeTeam");
    const awayTeam = formData.get("awayTeam");

    // Call postWedstrijd function with form data and speeldagId (id)
    postWedstrijd(date, homeTeam, awayTeam, id)
      .then((data) => {
        // Handle success, if needed
        console.log("Wedstrijd posted successfully:", data);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        // Handle error, if needed
        console.error("Failed to post wedstrijd:", error.message);
      });
  }

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="date">
          <Form.Label>Date:</Form.Label>
          <Form.Control type="date" placeholder="Enter date" name="date" />
        </Form.Group>
        <Form.Group controlId="homeTeam">
          <Form.Label>Home Team:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter home team"
            name="homeTeam"
          />
        </Form.Group>
        <Form.Group controlId="awayTeam">
          <Form.Label>Away Team:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter away team"
            name="awayTeam"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
