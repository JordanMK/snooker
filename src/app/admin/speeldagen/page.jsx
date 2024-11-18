"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import AdminPopup from "@/components/Popup";
import SpeelDagForm from "@/components/admin/speeldag/CreateSpeeldagForm";
import WedstrijdForm from "@/components/admin/wedstrijd/CreateWedstrijd";
import WedstrijdAdmin from "@/components/admin/wedstrijd/wedstrijdAdmin";

import {
	getSpeeldagen,
	patchSpeeldag,
	updateKlassementen,
	getSpeeldagenBySeizoenId,
	updateSpeeldagIsOnline,
	getAdminStatus,
	updateSpeeldagKlassement,
} from "@/src/api_calls";

import "bootstrap/dist/css/bootstrap.min.css";
import "reactjs-popup/dist/index.css";
import "@/styles/style.css";

import { Form, Button, ListGroup, Card, Row, Col } from "react-bootstrap";

export default function Speeldagen() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const seizoenId = searchParams.get("seizoenId");

	const [speeldagen, setSpeeldagen] = useState([]);
	const [isAdmin, setIsAdmin] = useState(false);

	const checkAuthState = async () => {
		const isAdmin = await getAdminStatus();
		if (isAdmin) {
			setIsAdmin(isAdmin);

			getSpeeldagenBySeizoenId(seizoenId)
				.then(setSpeeldagen)
				.catch(console.error);
		} else {
			router.push("/");
		}
	};

	useEffect(() => {
		checkAuthState();
	}, []);

	if (!isAdmin) return null;

	const updateIsOnline = async (speeldagId, online) => {
		try {
			await updateSpeeldagIsOnline(speeldagId, online); // Update de speeldag
			const updatedSpeeldagen = await getSpeeldagen(); // Haal opnieuw alle speeldagen op
			setSpeeldagen(updatedSpeeldagen); // Update de status in de UI
		} catch (error) {
			console.error("Error updating speeldag:", error);
		}
	};

	return (
		<>
			<div className="header text-center my-4">
				<h1>Admin Dashboard</h1>
			</div>
			<AdminPopup triggerButtonName="Nieuwe speeldag">
				<SpeelDagForm />
			</AdminPopup>
			{speeldagen.length > 0 && (
				<div className="speeldag">
					<ListGroup>
						{speeldagen
							.slice()
							.reverse()
							.map((speeldag, idx) => (
								<Speeldag
									speeldag={speeldag}
									number={speeldagen.length - idx}
									updateIsOnline={updateIsOnline}
									key={speeldag._id}
								/>
							))}
					</ListGroup>
				</div>
			)}
		</>
	);
}

function Speeldag({ speeldag, number, updateIsOnline }) {
	const {
		schiftingsvraag,
		schiftingsantwoord,
		startDatum,
		eindDatum,
		_id,
		wedstrijden,
		isOnline,
	} = speeldag;

	const onCheckboxChange = (event) => {
		updateIsOnline(_id, event.target.checked);
	};

	const onCreateKlassementButtonPressed = (event) => {
		try {
			updateSpeeldagKlassement(_id);
			console.log(speeldag.klassement);
		} catch (error) {
			console.error("Error creating seizoensklassement:", error);
		}
	};

	return (
		<ListGroup.Item className="mb-3">
			<Card>
				<Card.Header>
					<h2>Speeldag {number}</h2>
					<div className="form-check form-switch">
						<input
							className="form-check-input"
							type="checkbox"
							id={`online-${_id}`}
							checked={isOnline}
							onChange={onCheckboxChange}
						/>
						<label className="form-check-label" htmlFor={`online-${_id}`}>
							Plaats speeldag online
						</label>
					</div>
				</Card.Header>

				<Card.Body>
					<Row className="mb-3 justify-content-between">
						<Col xs="auto">
							<AdminPopup triggerButtonName="Pas aan">
								<PasSpeeldagAan
									schiftingsvraag={schiftingsvraag}
									schiftingsantwoord={schiftingsantwoord}
									startDatum={startDatum}
									eindDatum={eindDatum}
									speeldagId={_id}
								/>
							</AdminPopup>
						</Col>
						<Col xs="auto">
							<AdminPopup triggerButtonName="Nieuwe wedstrijd">
								<WedstrijdForm id={_id} />
							</AdminPopup>
						</Col>
						<Col xs="auto">
							<Button
								variant="primary"
								onClick={onCreateKlassementButtonPressed}
							>
								Creëer Klassement
							</Button>
						</Col>
					</Row>
					<Row>
						<Col>
							{wedstrijden.length > 0 && (
								<WedstrijdAdmin wedstrijden={wedstrijden} />
							)}
						</Col>
					</Row>
				</Card.Body>
			</Card>
		</ListGroup.Item>
	);
}

function PasSpeeldagAan({
	schiftingsvraag,
	schiftingsantwoord,
	startDatum,
	eindDatum,
	speeldagId,
}) {
	const searchParams = useSearchParams();
	const seizoenId = searchParams.get("seizoenId");

	const formattedStartDatum = formattedDate(new Date(startDatum));
	const formattedStartUur = formattedTime(new Date(startDatum));

	const formattedEindDatum = formattedDate(new Date(eindDatum));
	const formattedEindUur = formattedTime(new Date(eindDatum));

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

		patchSpeeldag(
			schiftingsvraag,
			schiftingantwoord,
			startDate,
			eindDate,
			speeldagId
		)
			.then(() => {
				updateKlassementen(seizoenId);
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
					<Form.Label>Start datum:</Form.Label>
					<Form.Control
						type="date"
						placeholder="startdatum"
						name="startdatum"
						defaultValue={formattedStartDatum}
					/>
				</Form.Group>
				<Form.Group controlId="startUur">
					<Form.Label>Start uur:</Form.Label>
					<Form.Control
						type="time"
						placeholder="startUur"
						name="startUur"
						defaultValue={formattedStartUur}
						format="HH:mm"
					/>
				</Form.Group>
				<Form.Group controlId="eindDatum">
					<Form.Label>Eind datum:</Form.Label>
					<Form.Control
						type="date"
						placeholder="eindDatum"
						name="eindDatum"
						defaultValue={formattedEindDatum}
					/>
				</Form.Group>
				<Form.Group controlId="einduur">
					<Form.Label>Eind uur:</Form.Label>
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
	);
}

function formattedDate(date) {
	const localDate = new Date(date);
	const offset = localDate.getTimezoneOffset(); // Get the timezone offset in minutes
	const localISODate = new Date(
		localDate.getTime() - offset * 60000
	).toISOString();
	return localISODate.split("T")[0];
}

function formattedTime(date) {
	const localDate = new Date(date);
	const offset = localDate.getTimezoneOffset(); // Get the timezone offset in minutes
	const localISOTime = new Date(
		localDate.getTime() - offset * 60000
	).toISOString();
	return localISOTime.split("T")[1].split(".")[0];
}
