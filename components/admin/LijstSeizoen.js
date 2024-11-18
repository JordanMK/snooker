"use client";
import React, { useState, useEffect } from "react";
import Seizoen from "../admin/Seizoen";
import { useRouter } from "next/navigation";
import { getSeizoenen, updateSeizoenIsOnline } from "@/src/api_calls";
import { Button } from "react-bootstrap";

export default function LijstSeizoen() {
    const router = useRouter();
    const maakSeizoenClick = () => {
        router.push("/admin/createSeizoen");
    };
    const [seizoenen, setSeizoenen] = useState([]);

    useEffect(() => {
        getSeizoenen()
            .then(setSeizoenen)
            .catch((error) => console.error(error.message));
    }, []);

    const updateIsOnline = async (seizoenId, online) => {
        try {
            await updateSeizoenIsOnline(seizoenId, online); // Update de seizoen
            const updatedSeizoenen = await getSeizoenen(); // Haal opnieuw alle seizoenen op
            setSeizoenen(updatedSeizoenen); // Update de status in de UI
        } catch (error) {
            console.error("Error updating seizoen:", error);
        }
    };

    return (
        <>
            <div className="seizoen-container">
                <h2>Seizoenen</h2>
                <Button onClick={maakSeizoenClick} variant="secondary" size="sm">Nieuw Seizoen</Button>
                {seizoenen.map((seizoen) => (
                    <div key={seizoen._id}>
                        <Seizoen seizoen={seizoen} updateIsOnline={updateIsOnline} />
                    </div>
                ))}
            </div>
        </>
    );
}
