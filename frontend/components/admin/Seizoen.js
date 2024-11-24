import "@/styles/style.css";
import Link from "next/link";
import { createKlassementSeizoen } from "../../src/api_calls";

export default function Seizoen({ seizoen, updateIsOnline }) {
	const onCheckBoxChange = (event) => {
		updateIsOnline(seizoen._id, event.target.checked);
	};

	const createSeizoenKlassement = () => {
		// Fetch the necessary data from the API and create the seizoensklassement.
		createKlassementSeizoen(seizoen._id);
	};

	return (
		<div className="seizoen">
			<p>
				{seizoen.name}
				<Link
					href={{
						pathname: "admin/speeldagen",
						query: {
							seizoenId: seizoen._id,
						},
					}}
				>
					Toon speeldagen
				</Link>
				<button onClick={createSeizoenKlassement}>
					Maak seizoensklassement
				</button>
			</p>
			<label htmlFor="online">Plaats seizoen online:</label>
			<input
				type="checkbox"
				name="online"
				checked={seizoen.isOnline}
				onChange={onCheckBoxChange}
			></input>
		</div>
	);
}
