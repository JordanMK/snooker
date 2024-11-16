import React, { useState, useEffect } from "react";
import {
    getSpeeldagen,
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
            setSpeeldagKlassement(klassementSpeeldag.klassement);
            console.log(
                "Speeldag Klassement + id:",
                speeldagId,
                klassementSpeeldag.klassement
            );
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
                            <h1>Speeldag Klassement</h1>
                            <p>
                                Resultaat schiftingsvraag:{" "}
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
