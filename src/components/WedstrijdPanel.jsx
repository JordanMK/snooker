import React, { useState, useEffect } from "react";
import "./components.css";
import { getSpeeldag } from "./api_calls/call.js";

export default function WedstrijdPanel({ speeldag_id }) {
  const [speeldag, setSpeeldag] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSpeeldag(speeldag_id)
      .then((json) => {
        const jsonData = JSON.parse(JSON.stringify(json)); // Convert JSON to Object
        setSpeeldag(jsonData);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setError("Error fetching data");
      });
  }, [speeldag_id]);

  return (
    <>
      <div>
        <p className="speeldagTitel">Speeldag</p>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            {speeldag.wedstrijden.length > 0 && (
              <>
                <table style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>Match</th>
                      <th>Winst ploeg 1</th>
                      <th>Gelijkspel</th>
                      <th>Winst ploeg 2</th>
                    </tr>
                  </thead>
                  <tbody>
                    {speeldag &&
                      speeldag.wedstrijden.map((match) => (
                        <tr key={match._id}>
                          <td>
                            <span>
                              {match.thuis} - {match.uit}
                            </span>
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
                      ))}
                  </tbody>
                </table>
                <div className="jokerContainer checkbox-wrapper-13">
                  <label htmlFor="c1-13">Gebruik joker?</label>
                  <input type="checkbox" name="joker" id="c1-13" />
                </div>
                <div className="schiftingsContainer">
                  <h4>Schiftingsvraag:</h4>
                  <label htmlFor="schiftingsvraag">
                    Gok nummer 1 tot 10000:{" "}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10000"
                    name="schiftingsvraag"
                    id="schiftingsvraag"
                  />
                </div>
              </>
            )}<p>Geen wedstrijden</p>
          </>
        )}
      </div>
    </>
  );
}
