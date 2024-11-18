import React from "react";
import { deleteWedstrijd } from "@/src/api_calls";
import AdminPopup from "@/components/Popup";
import PasWedstrijdAan from "@/components/admin/wedstrijd/PasWedstrijdAan";
import { ListGroup, Container, Row, Col, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function WedstrijdAdmin({ wedstrijden, seizoenID }) {
	const handleVerwijderClick = (wedstrijdId) => {
		if (
			window.confirm("Weet je zeker dat je deze wedstrijd wilt verwijderen?")
		) {
			deleteWedstrijd(wedstrijdId);
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		}
	};

	return (
		<Container fluid>
			<ListGroup>
				{wedstrijden.map((wedstrijd) => (
					<ListGroup.Item key={wedstrijd._id} className="mb-3">
						<Row className="align-items-center">
							<Col md={8}>
								<strong>Thuis:</strong> {wedstrijd.thuis} -{" "}
								<strong>Uit:</strong> {wedstrijd.uit}
							</Col>
							<Col md={4} className="text-end">
								<AdminPopup triggerButtonName="Pas aan" icon={FaEdit}>
									<PasWedstrijdAan
										id={wedstrijd._id}
										thuis={wedstrijd.thuis}
										uit={wedstrijd.uit}
										datum={wedstrijd.datum}
										resultaat={wedstrijd.resultaat}
										seizoenId={seizoenID}
									/>
								</AdminPopup>
								<Button
									variant="outline-danger"
									className="m-1"
									onClick={() => handleVerwijderClick(wedstrijd._id)}
								>
									<FaTrash className="me-2" />
									Verwijder
								</Button>
							</Col>
						</Row>
					</ListGroup.Item>
				))}
			</ListGroup>
		</Container>
	);
}
