import { Form, Button } from "react-bootstrap";
import { patchWedstrijd } from "@/src/api_calls";
import { useRouter } from "next/navigation";

export default function PasWedstrijdAan({
	id,
	thuis,
	uit,
	datum,
	resultaat,
	seizoenId,
}) {
	const router = useRouter();

	async function handlePatchSubmit(event) {
		event.preventDefault();

		const formData = new FormData(event.target);
		const [date, homeTeam, awayTeam, result] = [
			"date",
			"homeTeam",
			"awayTeam",
			"resultaat",
		].map((field) => formData.get(field));

		patchWedstrijd(date, homeTeam, awayTeam, result, id, seizoenId)
			.then(router.reload)
			.catch((error) =>
				console.error("Failed to patch wedstrijd:", error.message)
			);
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
					<Form.Label>Result:</Form.Label>
					<div>
						<Form.Check
							type="radio"
							label="Thuisploeg gewonnen"
							name="resultaat"
							value="1"
							defaultChecked={resultaat === 1}
						/>
						<Form.Check
							type="radio"
							label="Gelijkspel"
							name="resultaat"
							value="3"
							defaultChecked={resultaat === 3}
						/>
						<Form.Check
							type="radio"
							label="Uitploeg gewonnen"
							name="resultaat"
							value="2"
							defaultChecked={resultaat === 2}
						/>
					</div>
				</Form.Group>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</Form>
		</>
	);
}
