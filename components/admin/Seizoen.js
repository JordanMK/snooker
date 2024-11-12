import "@/styles/style.css";
import Link from "next/link";

export default function Seizoen({ seizoen, updateIsOnline }) {
	const onCheckBoxChange = (event) => {
		updateIsOnline(seizoen._id, event.target.checked);
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
