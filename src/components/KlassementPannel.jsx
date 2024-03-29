import React, { useState, useEffect } from "react";
import {
  getSpeeldagen,
  getKlassement,
  getUserName,
  getSeizoenen,
} from "./api_calls/call.js";
import "../app/css/Klassement.css";
import 'react-bootstrap'

export default function KlassementPannel(speeldag_id) {
  const [speeldagen, setSpeeldagen] = useState([]);
  const [klassement, setKlassement] = useState([]);

  console.log('speeldagID',speeldag_id.speeldag_id);

  useEffect(() => {
    getSpeeldagen()
      .then((speeldagen) => {
        setSpeeldagen(speeldagen);
        console.log('klassment',getKlassement(speeldag_id.speeldag_id))
        return getKlassement(speeldag_id.speeldag_id);
      })
      .then((klassement) => {
        return Promise.all(
          klassement.map((item) =>
            fetch(`http://localhost:3001/api/users/${item.user}`)
              .then((response) => response.json())
              .then((json) => {
                const userData = JSON.parse(JSON.stringify(json));
                item.user = userData.username;
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
  }, []);

  return (
    <> 
    {console.log('klassement',klassement)}
    {klassement.length > 0 && (
      <>
      <div className="">
        <div className="panelNav">
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
          <div id='klassementSeizoen'>
            <h1>Klassement Seizoen </h1>
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
          {/* <a className="a" href="">Show more</a>
            <a className="a" href="">Show more</a> */}
        </div>
      </div>
    </>
    )}<p>Geen speeldagKlassment beschikbaar</p>
      </>
  );
}
