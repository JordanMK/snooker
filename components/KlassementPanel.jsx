import React, { useState, useEffect } from "react";
import {
	getSpeeldagen,
	getUser,
	getKlassementSpeeldag,
	getSpeeldag,
} from "@/src/api_calls";
import "@/styles/Klassement.css";
import "react-bootstrap";

// TODO: cleanup
export default function KlassementPanel({ speeldagId }) {
	// TODO: unused
	const [speeldagen, setSpeeldagen] = useState([]);
	const [speeldag, setSpeeldag] = useState([]);
	const [klassement, setKlassement] = useState([]);
	const [speeldagKlassement, setSpeeldagKlassement] = useState([]);
	const [isLoading, setIsLoading] = useState(true); // Track loading state

	const onMount = async () => {
		try {
			const speeldagen = await getSpeeldagen();
			setSpeeldagen(speeldagen);

			const playday = await getSpeeldag(speeldagId);
			setSpeeldag(playday);
			console.log("SPEELDAGID: ", speeldagId);
			const klassementSpeeldag = await getKlassementSpeeldag(speeldagId);

			const updatedKlass = await Promise.all(
				klassementSpeeldag.klassement.map(async (item) => {
					const user = await getUser(item.user);
					item.user = user.username;
					return item;
				})
			);

			setSpeeldagKlassement(updatedKlass);
			console.log(
				"Speeldag Klassement + id:",
				speeldagId,
				klassementSpeeldag.klassement
			);

			/*const updatedKlassement = await Promise.all(
				speeldagKlassement.map(async (item) => {
					const user = await getUser(item.user);
					item.user = user.username;
					return item;
				})
			);

			console.warn("KLASSEMENT met namen:", updatedKlassement);
			setKlassement(updatedKlassement);*/
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		console.log("Geselecteerde speeldag ID: ", speeldagId);
		onMount();
	}, [speeldagId]);

	// Render only when klassement is no longer undefined
	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<>
			{speeldagKlassement && speeldagKlassement.length > 0 && (
				<div className="">
					<div className="panelKlassement">
						<div className="klassementSpeeldag">
							<h1>Klassement Speeldag</h1>
							<p>
								Resultaat Schiftingsvraag:{" "}
								<strong>{speeldag.schiftingsantwoord}</strong>
							</p>
							<table className="styled-table">
								<thead>
									<tr>
										<th>Plaats</th>
										<th>Naam</th>
										<th>Score</th>
										<th>Heeft joker gebruikt</th>
										{isBeforeToday(speeldag.eindDatum) && (
											<th>Antwoord SchiftingsVraag</th>
										)}
									</tr>
								</thead>
								<tbody>
									{speeldagKlassement.map((item) => (
										<tr key={item._id}>
											<td>{item.plaats}</td>
											<td>{item.user}</td>
											<td>{item.score}</td>
											<td>{item.jokerGebruikt ? "Ja" : "Nee"}</td>
											{isBeforeToday(speeldag.eindDatum) && (
												<td>{item.SchiftingsvraagAntwoord}</td>
											)}
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}
			{speeldagKlassement && speeldagKlassement.length === 0 && (
				<p>Geen speeldag klassement beschikbaar</p>
			)}
		</>
	);
}

function isBeforeToday(datum) {
	return new Date(datum) < new Date();
}
