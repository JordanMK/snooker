"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SeizoenForm() {
	function handleForm(formData) {
		const naam = formData.get("naam");
		const bevriesKlassement = formData.get("bevriesKlassement");
		const startDatum = formData.get("startDatum");
		const startTijd = formData.get("startTijd");
		const eindDatum = formData.get("eindDatum");
		const eindTijd = formData.get("eindTijd");
	}
	const handleSubmit = (e) => {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);

		handleForm(formData);
        
	};
	return (
		<>
			<div className="container d-flex">
				<div className="form- w-50 justify-content-center">
					<form action="/submit" method="POST">
						<label htmlFor="name">Name:</label>
						<input type="text" name="name" className="form-control" required />
						<br />
						<label htmlFor="bevriesKlassement">Bevries Klassement:</label>
						<input
							type="date"
							name="bevriesKlassement"
							className="form-control"
							required
						/>
						<br />
						<label htmlFor="startDatum">Start Datum:</label>
						<input
							type="date"
							name="startDatum"
							className="form-control"
							required
						/>
						<br />
						<label htmlFor="startTijd">Start Tijd:</label>
						<input
							type="time"
							name="startTijd"
							className="form-control"
							required
						/>
						<br />
						<label htmlFor="eindDatum">Eind Datum:</label>
						<input
							type="date"
							name="eindDatum"
							className="form-control"
							required
						/>
						<br />
						<label htmlFor="eindTijd">Eind Tijd:</label>
						<input
							type="time"
							name="eindTijd"
							className="form-control"
							required
						/>
						<br />
						<button type="submit" className="btn btn-primary">
							Submit
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
