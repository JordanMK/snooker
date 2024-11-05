import { getSeizoenen, getSpeeldagenBySeizoenId } from "@/src/api_calls";
import { match } from "assert";
import React, { useEffect, useState } from "react";

export default function SeizoenPanel({ onClick, onSelect }) {
	const [selectedIndex, setSelectedIndex] = useState(null);
	const [selectedSeason, setSelectedSeason] = useState(null);
	const [seasons, setSeasons] = useState(null);
	const [matchDays, setMatchDays] = useState(null);

	useEffect(() => {
		getSeizoenen()
			.then((data) => {
				const reversedSeasons = data.reverse();
				setSeasons(reversedSeasons);
				console.log("rev", reversedSeasons);
				if (reversedSeasons.length > 0)
					setSelectedSeason(reversedSeasons[0]._id);
				onSelect(reversedSeasons[0]._id);
			})
			.catch((error) => console.log(error));
	}, []);

	useEffect(() => {
		if (selectedSeason != null) {
			getSpeeldagenBySeizoenId(selectedSeason)
				.then((data) => {
					console.log("data", data);
					setMatchDays(data);
				})
				.catch((error) => console.log(error));
		}
	}, [selectedSeason]);

	const handleClick = (index, id) => {
		onClick(id);
		setSelectedIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	const ShowSeasons = () => {
		if (seasons == null) return;
		if (seasons.length === 0) return <p>Er zijn geen seizoenen beschikbaar</p>;
		return (
			<select
				id="seizoenTitle"
				value={selectedSeason || ""}
				onChange={(event) => {
					setSelectedSeason(event.target.value);
					onSelect(event.target.value);
					setSelectedIndex(null);
					console.log(event.target);
				}}
			>
				{seasons.map((season, key) => {
					return (
						<option key={key} value={season._id}>
							{season.name}
						</option>
					);
				})}
			</select>
		);
	};

	const ShowMatchDays = () => {
		if (matchDays == null) return;
		if (matchDays.length === 0)
			return <p>Er zijn geen speeldagen voor dit seizoen</p>;
		return (
			<ul id="speeldagenList">
				{matchDays
					.filter((m) => m.isOnline)
					.slice()
					.reverse()
					.map((speeldag) => {
						const originalIndex = matchDays.findIndex(
							(s) => s._id === speeldag._id
						);
						return (
							<li key={speeldag._id}>
								{" "}
								{/* Gebruik de _id voor een unieke key */}
								<button
									data-id={speeldag._id}
									onClick={() =>
										handleClick(matchDays.indexOf(speeldag), speeldag._id)
									}
									style={
										selectedIndex === originalIndex
											? { backgroundColor: "green" }
											: null
									}
								>
									Speeldag {matchDays.indexOf(speeldag) + 1}
								</button>
							</li>
						);
					})}
			</ul>
		);
	};

	return (
		<div>
			<ShowSeasons />
			<ShowMatchDays />
		</div>
	);
}
