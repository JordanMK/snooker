"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Popup from "reactjs-popup";
import { Container, Row, Col, Button } from "react-bootstrap";

const contentStyle = {
	width: "50%",
};

export default function AdminPopup({ triggerButtonName, children }) {
	return (
		<Popup
			modal
			contentStyle={contentStyle}
			trigger={
				<Button
					variant="primary"
					className="m-1"
				>
					{triggerButtonName}
				</Button>
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
								<Button
									variant="danger"
									className="position-absolute"
									onClick={close}
									style={{ top: "10px", right: "10px" }}
								>
									X
								</Button>
								{children}
							</div>
						</Col>
					</Row>
				</Container>
			)}
		</Popup>
	);
}
