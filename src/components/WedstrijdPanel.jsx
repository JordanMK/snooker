import React, { useState, useEffect } from 'react';
import "./components.css";

export default function WedstrijdPanel({ speeldag }) {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3001/api/wedstrijden/')
            .then(response => response.json())
            .then(json => setData( JSON.parse(json)))
            .catch(error => console.error(error));
    }, []);



    return (
        <>
            <div>
                {data ? <pre> {
                data.datum
                }</pre> : 'Loading...'}
            </div>

            <p className="speeldagTitel">Speeldag {speeldag.speeldagNr}</p>
            <table style={{ width: "100%" }}>
                <tr>
                    <th>match</th>
                    <th>Winst ploeg 1</th>
                    <th>Gelijkspel</th>
                    <th>Winst ploeg 2</th>
                </tr>
                {speeldag.wedstrijden.map(wedstrijd =>
                    <tr key={wedstrijd.id}>
                        <td>
                            <span>{wedstrijd.id}. </span>
                            <span>{wedstrijd.thuis}</span>
                            <span> - </span>
                            <span>{wedstrijd.weg}</span>
                        </td>
                        <td>
                            <input type="checkbox" name="check" />
                        </td>
                        <td>
                            <input type="checkbox" name="check" />
                        </td>
                        <td>
                            <input type="checkbox" name="check" />
                        </td>

                    </tr>
                )}
            </table>
            <div className="jokerContainer checkbox-wrapper-13">
                <label htmlFor="c1-13">Gebruik joker?</label>
                <input type="checkbox" name="joker" id="c1-13" />

            </div>

            <div className="schiftingsContainer">
                <h4>Schiftingsvraag:</h4>

                <label htmlFor="schiftingsvraag">Gok nummer 1 tot 10000: </label>
                <input type="number" min="0" name="schiftingsvraag" id="schiftingsvraag" />
            </div>

        </>
    );
}