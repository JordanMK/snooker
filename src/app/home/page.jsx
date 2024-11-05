"use client";
import React, { useEffect, useState } from "react";

import KlassementPanel from "@/components/KlassementPanel";
import KlassementSeizoenPannel from "@/components/KlassementSeizoenPannel";
import SeizoenPanel from "@/components/SeizoenPanel";
import WedstrijdPanel from "@/components/WedstrijdPanel";
import "@/styles/Home.css";
import { getSpeeldagen } from "@/src/api_calls";

export default function Home() {
	const [leftPanelSelected, setLeftPanelSelected] = useState(true);
	const [selectedSpeeldag, setSelectedSpeeldag] = useState(null);
	const [showklassementSeizoenPanel, setShowKlassementSeizoenPanel] =
		useState(true);
	const [speeldagen, setSpeeldagen] = useState([]);
	const [seizoen, setSeizoen] = useState(null);

	const onSelectSpeeldag = (itemIdx) => {
		if (selectedSpeeldag === itemIdx) {
			setShowKlassementSeizoenPanel(true);
			setSelectedSpeeldag(null);
		} else {
			setShowKlassementSeizoenPanel(false);
			setSelectedSpeeldag(itemIdx);
		}
	};

	const onSelectSeizoen = (id) => {
		setShowKlassementSeizoenPanel(true);
		setSelectedSpeeldag(null);
		setSeizoen(id);
	};

	useEffect(() => {
		getSpeeldagen()
			.then(setSpeeldagen)
			.catch((error) => console.error(error.message));
	}, []);

	return (
		<div className="pageContainer">
			<div className="smallColumn">
				<SeizoenPanel onClick={onSelectSpeeldag} onSelect={onSelectSeizoen} />
			</div>
			<div className="column flexColumn">
				<div className="panelNav">
					<button
						onClick={() => setLeftPanelSelected(true)}
						style={{
							backgroundColor: leftPanelSelected ? "#bc6c25" : "#dda15e",
						}}
					>
						Klassement
					</button>
					{selectedSpeeldag !== null && (
						<button
							onClick={() => setLeftPanelSelected(false)}
							style={{
								backgroundColor: !leftPanelSelected ? "#bc6c25" : "#dda15e",
								cursor: "pointer",
							}}
						>
							Wedstrijd
						</button>
					)}
				</div>
				<div>
					{showklassementSeizoenPanel ? (
						<KlassementSeizoenPannel seasonId={seizoen} />
					) : (
						<>
							{leftPanelSelected ? (
								<KlassementPanel speeldagId={selectedSpeeldag} />
							) : (
								selectedSpeeldag !== null && (
									<WedstrijdPanel speeldagId={selectedSpeeldag} />
								)
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
