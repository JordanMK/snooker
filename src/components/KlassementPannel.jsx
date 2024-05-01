import React, { useState, useEffect } from "react";
import {
  getSpeeldagen,
  getKlassement,
  getUser,
  getSeizoenen,
  getKlassementSpeeldag,
  getKlassementSeizoen,
} from "./api_calls/call.js";
import "../app/css/Klassement.css";
import 'react-bootstrap';
import KlassementSeizoenPannel from "@/Components/KlassementSeizoenPannel";


export default function KlassementPannel(speeldag_id) {
  const [speeldagen, setSpeeldagen] = useState([]);
  const [klassement, setKlassement] = useState([]);

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
            getUser(item.user)
              .then((user) => {
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
      });
  }, [speeldag_id.speeldag_id]);

  return (
    <> 
    {console.log('klassement',klassement)}
    {klassement.length > 0 && (
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
                  {/*<th>Score per wedstrijd</th>*/}
                </tr>
              </thead>
              <tbody>
                {klassement.map((item) => (
                  <tr key={item._id}>
                    <td>{item.plaats}</td>
                    <td>{item.user}</td>
                    <td>{item.score}</td>
                  </tr>
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
    {klassement.length  === 0 && (
                <p>Geen speeldagKlassement beschikbaar</p>
            )}
    
      </>
  );
}
