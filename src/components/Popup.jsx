"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Popup from "reactjs-popup";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
};
const contentStyle = {
  width: "50%",
};

import { Container, Row, Col } from "react-bootstrap";

const AdminPopup = ({ popupContent, triggerButtonName }) => (
  <>
    <Popup
      modal
      contentStyle={contentStyle}
      trigger={
        <button class="btn btn-sm btn-light m-1">{triggerButtonName}</button>
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
                  class="btn btn-danger"
                  onClick={close}
                  style={{ position: "absolute", top: "5px", right: "5px" }}
                >
                  X
                </button>
                {popupContent}
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </Popup>
  </>
);

export default AdminPopup;
