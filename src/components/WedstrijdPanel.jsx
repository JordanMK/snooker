import React, { useState, useEffect } from 'react';
import "./components.css";
import {
    getSpeeldag
  } from "./api_calls/call.js";
export default function WedstrijdPanel({ speeldag_id }) {

    const [f_speeldag,setSpeeldag] = useState(null);

    console.log('binnen',speeldag_id);

    useEffect(() => {
        getSpeeldag(speeldag_id)
            .then(json => {
                const jsonData = JSON.parse(JSON.stringify(json)); // Convert JSON to Object
                setSpeeldag(jsonData);

                console.log(jsonData);
            })
            .catch(error => console.error(error));
    }, []);

    

    return (
        <>
            {/* <div>
                {data ?
                    data.map(match => (
                        <div key={match._id}>
                            <pre>{JSON.stringify(match, null, 2)}</pre>
                            <p>{match.resultaat}</p>
                        </div>
                    ))
                    : 'Loading...'}

            </div> */}

            <div>
                <p className="speeldagTitel">Speeldag</p>
                <table style={{ width: "100%" }}>
                    <tr>
                        <th>match</th>
                        <th>Winst ploeg 1</th>
                        <th>Gelijkspel</th>
                        <th>Winst ploeg 2</th>
                    </tr>
                    {f_speeldag ? f_speeldag.wedstrijden.map(match => (
                        <tr key={match._id}>
                            <td>
                                {/* <span>{match._id}. </span> */}
                                <span>{match.thuis}</span>
                                <span> - </span>
                                <span>{match.uit}</span>
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
                    )) 
                    : 'Loading...'}
                </table>
            </div>

            <div className="jokerContainer checkbox-wrapper-13">
                <label htmlFor="c1-13">Gebruik joker?</label>
                <input type="checkbox" name="joker" id="c1-13" />

            </div>

            <div className="schiftingsContainer">
                <h4>Schiftingsvraag:</h4>

                <label htmlFor="schiftingsvraag">Gok nummer 1 tot 10000: </label>
                <input type="number" min="0" max="10000" name="schiftingsvraag" id="schiftingsvraag"/>
            </div>

        </>
    );
}