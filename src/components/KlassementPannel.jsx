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
  const [speeldagen, setSpeeldagen] = useState([]);
  const [klassement, setKlassement] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  console.log('speeldagID', speeldag_id.speeldag_id);

  useEffect(() => {
    getSpeeldagen()
      .then((speeldagen) => {
        setSpeeldagen(speeldagen);
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
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Plaats</th>
                  <th>Naam</th>
                  <th>Score</th>
                  <th>Heeft joker gebruikt</th>
                </tr>
              </thead>
              <tbody>
                {klassement.map((item) => (
                  <>
                  {console.log('item', item)}
                  <tr key={item._id}>
                    <td>{item.plaats}</td>
                    <td>{item.user}</td>
                    <td>{item.score}</td>
                    <td>{item.jokerGebruikt ? "Ja" : "Nee"}</td>
                  </tr>
                  </>
                  
                ))}
              </tbody>
            </table>
          </div>
          <KlassementSeizoenPannel/>
          {/* <a className="a" href="">Show more</a>
            <a className="a" href="">Show more</a> */}
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
