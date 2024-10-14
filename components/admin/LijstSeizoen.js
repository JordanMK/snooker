"use client"
import React, { useState, useEffect } from "react"
import Seizoen from "../admin/Seizoen"
import { useRouter } from "next/navigation"
import { getSeizoenen } from "@/src/api_calls"

export default function LijstSeizoen() {
	const router = useRouter()
	const maakSeizoenClick = () => {
		router.push("/admin/createSeizoen")
	}
	const [seizoenen, setSeizoenen] = useState([])

	useEffect(() => {
		getSeizoenen()
      .then(setSeizoenen)
      .catch(error => console.error(error.message))
	}, [])

	return (
		<>
			<div className="seizoen-container">
				<h1>Seizoenen</h1>
				<button type="button" className="" onClick={maakSeizoenClick}>
					nieuw Seizoen
				</button>
				{seizoenen.map((seizoen) => (
					<div key={seizoen._id}>
						<Seizoen seizoen={seizoen} />
					</div>
				))}
			</div>
		</>
	)
}
