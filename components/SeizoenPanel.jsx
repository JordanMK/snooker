import { getSeizoenen, getSpeeldagenBySeizoenId } from "@/src/api_calls";
import React, { useEffect, useState } from "react";

export default function SeizoenPanel({ onClick, speeldagen }) {
	const [selectedIndex, setSelectedIndex] = useState(null);
	const [selectedSeason, setSelectedSeason] = useState(null);
	const [seasons, setSeasons] = useState([]);
	const [matchDays, setMatchDays] = useState([]);

	useEffect(() => {
		getSeizoenen()
			.then((data) => {
				setSeasons(data.reverse());
				if (data.length >= 1) {
					setSelectedSeason(data[0]._id);
					console.log(data[0]._id);
				}
			})
			.catch((error) => console.log(error));
	}, []);

	useEffect(() => {
		if (selectedSeason != null) {
			getSpeeldagenBySeizoenId(selectedSeason)
				.then((data) => {
					const onlineMatchDays = data.filter((matchDay) => matchDay.isOnline);
					setMatchDays(onlineMatchDays);
					console.log(onlineMatchDays);
				})
				.catch((error) => console.log(error));
		}
	}, [selectedSeason]);

	const handleClick = (index) => {
		onClick(index);
		setSelectedIndex((prevIndex) => (prevIndex === index ? null : index));
	};

	const ShowSeasons = () => {
		if (seasons.length > 0) {
			return (
				<select
					id="seizoenTitle"
					onChange={({ target }) => setSelectedSeason(target.value)}
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
		} else {
			return <p>Er zijn geen seizoenen beschikbaar</p>;
		}
	};

	return (
		<>
			<ShowSeasons />
			<ul id="speeldagenList">
				{matchDays
					.slice() // Maak een kopie van de array
					.reverse() // Omgekeerde volgorde
					.map((speeldag, reversedIndex) => {
						// Gebruik de originele index voor de nummering
						const originalIndex = speeldagen.findIndex(
							(s) => s._id === speeldag._id
						);
						return (
							<li key={speeldag._id}>
								{" "}
								{/* Gebruik de _id voor een unieke key */}
								<button
									onClick={() => handleClick(originalIndex)}
									style={
										selectedIndex === originalIndex
											? { backgroundColor: "green" }
											: null
									}
								>
									Speeldag {originalIndex + 1} {/* Originele nummering */}
								</button>
							</li>
						);
					})}
			</ul>
		</>
	);
}
