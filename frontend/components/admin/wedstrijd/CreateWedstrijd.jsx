import { Form, Button } from "react-bootstrap";
import { postWedstrijd } from "@/src/api_calls";
import { useState } from "react";

export default function WedstrijdForm({ id }) {
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false); // State to track form submission

	function handleFormSubmit(event) {
		event.preventDefault();

		if (isSubmitting) return; // Prevent multiple submissions

		const formData = new FormData(event.target);
		const date = formData.get("date");
		const homeTeam = formData.get("homeTeam");
		const awayTeam = formData.get("awayTeam");

		const newErrors = {};

		if (!date) {
			newErrors.date = "Invalid date";
		}
		if (!homeTeam) {
			newErrors.homeTeam = "Invalid home team";
		}
		if (!awayTeam) {
			newErrors.awayTeam = "Invalid away team";
		}

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		setIsSubmitting(true); // Disable further submissions

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
				setIsSubmitting(false); // Re-enable the button if there's an error
			});
	}

	return (
		<>
			<Form onSubmit={handleFormSubmit}>
				<Form.Group controlId="date">
					<Form.Label>Date:</Form.Label>
					<Form.Control
						type="date"
						placeholder="Enter date"
						name="date"
						isInvalid={!!errors.date}
					/>
					<Form.Control.Feedback type="invalid">
						{errors.date}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group controlId="homeTeam">
					<Form.Label>Home Team:</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter home team"
						name="homeTeam"
						isInvalid={!!errors.homeTeam}
					/>
					<Form.Control.Feedback type="invalid">
						{errors.homeTeam}
					</Form.Control.Feedback>
				</Form.Group>
				<Form.Group controlId="awayTeam">
					<Form.Label>Away Team:</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter away team"
						name="awayTeam"
						isInvalid={!!errors.awayTeam}
					/>
					<Form.Control.Feedback type="invalid">
						{errors.awayTeam}
					</Form.Control.Feedback>
				</Form.Group>
				<Button variant="primary" type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Submitting..." : "Submit"}
				</Button>
			</Form>
		</>
	);
}
