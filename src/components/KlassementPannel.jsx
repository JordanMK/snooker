import React, { useState, useEffect } from "react";
import {
  getSpeeldagen,
  getUser,
  getKlassementSpeeldag,
} from "../components/api_calls/call";
import "@/styles/Klassement.css"
import 'react-bootstrap';
import KlassementSeizoenPannel from "../components/KlassementSeizoenPannel";


export default function KlassementPannel(speeldag_id) {

  function isBeforeToday(datum) {
    return new Date(datum) < new Date();
  }

  const [speeldagen, setSpeeldagen] = useState([]);
  const [speeldag, setSpeeldag] = useState([]);
  const [klassement, setKlassement] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    getSpeeldagen()
      .then((speeldagen) => {
        setSpeeldagen(speeldagen);
        setSpeeldag(speeldagen.find((speeldag) => speeldag._id == speeldag_id.speeldag_id));
        return getKlassementSpeeldag(speeldag_id.speeldag_id);
      })
      .then((klassement) => {
        return Promise.all(
          klassement.map((item) =>
            getUser(item.user).then((user) => {
              item.user = user.username;
              return item;
            })
          )
        );
      })
      .then((modifiedKlassement) => {
        setKlassement(modifiedKlassement);
      })
      .then(
      )
      .catch((error) => {
        console.error(error.message);
      })
      .finally(() => {
        setIsLoading(false); // Update loading state when done
      });
  }, [speeldag_id.speeldag_id]);

  // Render only when klassement is no longer undefined
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <> 
    {klassement && klassement.length > 0 && (
      <>
      <div className="">
        <div className="panelKlassement">
          <div className="klassementSpeeldag">
            <h1>Klassement Speeldag</h1>
            <p>Resultaat Schiftingsvraag: <strong>{speeldag.schiftingsantwoord}</strong></p>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Plaats</th>
                  <th>Naam</th>
                  <th>Score</th>
                  <th>Heeft joker gebruikt</th>
                  {isBeforeToday(speeldag.eindDatum) && (<th>Antwoord SchiftingsVraag</th>)}
                </tr>
              </thead>
              <tbody>
                {klassement.map((item) => (
                  <>
                  <tr key={item._id}>
                    <td>{item.plaats}</td>
                    <td>{item.user}</td>
                    <td>{item.score}</td>
                    <td>{item.jokerGebruikt ? "Ja" : "Nee"}</td>
                    {isBeforeToday(speeldag.eindDatum) && ( <td>{item.SchiftingsvraagAntwoord}</td> )}
                    
                  </tr>
                  </>
                  
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
    )}
    {klassement && klassement.length  === 0 && (
                <p>Geen speeldagKlassement beschikbaar</p>
            )}
    
      </>
  );
}
