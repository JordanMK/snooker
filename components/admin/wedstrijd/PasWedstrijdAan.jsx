import { Form, Button } from "react-bootstrap"
import { patchWedstrijd } from "@/src/api_calls"
import { useRouter } from "next/navigation"

export default function PasWedstrijdAan({ id, thuis, uit, datum, resultaat, seizoenId }) {
  const router = useRouter()

  async function handlePatchSubmit(event) {
    event.preventDefault()

    // TODO: why is resultaat both defined in props and retrieved from the form?
    const formData = new FormData(event.target)
    const [date, homeTeam, awayTeam, resultaat] =
      ["date", "homeTeam", "awayTeam", "resultaat"]
      .map(formData.get)

    patchWedstrijd(date, homeTeam, awayTeam, resultaat, id, seizoenId)
      .then(router.reload)
      .catch(error => console.error("Failed to patch wedstrijd:", error.message))
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
  )
}
