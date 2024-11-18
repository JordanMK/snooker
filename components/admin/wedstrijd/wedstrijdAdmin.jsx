import React from "react";
import { deleteWedstrijd } from "@/src/api_calls";
import AdminPopup from "@/components/Popup";
import PasWedstrijdAan from "@/components/admin/wedstrijd/PasWedstrijdAan";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { ListGroup, Container, Row, Col } from "react-bootstrap";

export default function WedstrijdAdmin({ wedstrijden, seizoenID }) {
  const handleVerwijderClick = (wedstrijdId) => {
    if (window.confirm("Weet je zeker dat je deze wedstrijd wilt verwijderen?")) {
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
                <strong>Thuis:</strong> {wedstrijd.thuis} - <strong>Uit:</strong> {wedstrijd.uit}
              </Col>
              <Col md={4} className="text-end">
                <AdminPopup triggerButtonName="Pas aan">
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
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  color="error"
                  className="m-1"
                  onClick={() => handleVerwijderClick(wedstrijd._id)}
                  sx={{ textTransform: "none" }}
                >
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