"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Popup from "reactjs-popup";
import { Container, Row, Col } from "react-bootstrap";

const contentStyle = {
  width: "50%",
};

export default function AdminPopup({ triggerButtonName, children }) {
  return (
    <Popup
      modal
      contentStyle={contentStyle}
      trigger={
        <button className="btn btn-sm btn-light m-1">{triggerButtonName}</button>
      }
      position="right center"
    >
      {(close) => (
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "50vh" }}
        >
          <Row>
            <Col xs={12} className="text-center">
              <div>
                <button
                  className="btn btn-danger"
                  onClick={close}
                  style={{ position: "absolute", top: "5px", right: "5px" }}
                >
                  X
                </button>
                {children}
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </Popup>
  )
}
