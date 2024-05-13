import { Form, Button } from "react-bootstrap";
import { patchWedstrijd, updateSpeeldagKlassement } from "../../api_calls/call";
import { useRouter } from "next/router";


export default function PasWedstrijdAan(id, thuis, uit, datum,resultaat) {

  const router = useRouter();
  const { seizoenId } = router.query;


  function handlePatchSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const date = formData.get("date");
    const homeTeam = formData.get("homeTeam");
    const awayTeam = formData.get("awayTeam");
    const resultaat = formData.get("resultaat");

    // Call patchWedstrijd function with form data and speeldagId (id)
    patchWedstrijd(date, homeTeam, awayTeam, resultaat, id,seizoenId)
      .then((data) => {
        // Handle success, if needed
        console.log("Wedstrijd patched successfully:", data);
        //updateSpeeldagKlassement(speeldagId)
        setTimeout(() => {
          //window.location.reload();
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
        <Form.Group controlId="date">
          <Form.Label>Date:</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter date"
            name="date"
            defaultValue={new Date(datum).toISOString().split("T")[0]}
          />
        </Form.Group>
        <Form.Group controlId="homeTeam">
          <Form.Label>Home Team:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter home team"
            name="homeTeam"
            defaultValue={thuis}
          />
        </Form.Group>
        <Form.Group controlId="awayTeam">
          <Form.Label>Away Team:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter away team"
            name="awayTeam"
            defaultValue={uit}
          />
        </Form.Group>
        <Form.Group controlId="resultaat">
          <Form.Label>
            Resultaat: (1) thuisploeg gewonnen (2) uitploeg gewonnen (x)
            gelijkspel
          </Form.Label>
          <Form.Control type="text" placeholder="Resultaat" name="resultaat" defaultValue={resultaat} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
