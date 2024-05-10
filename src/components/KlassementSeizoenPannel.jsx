import React, { useState, useEffect } from "react";
import {
  getSpeeldagen,
  getUser,
  getSeizoenen,
  getKlassementSeizoen,
} from "./api_calls/call.js";
import "@/styles/Klassement.css"
import 'react-bootstrap';

export default function KlassementSeizoenPannel({seizoen_id}) {
  console.log('seizoen_id in klassementSeizoen', seizoen_id);
  const [klassement, setKlassement] = useState([]);

  useEffect(() => {
    if(seizoen_id){
      getKlassementSeizoen(seizoen_id)
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
    }
    
  },[seizoen_id]);

  return (
    
    <> 
    {console.log('klassement',klassement)}
    {klassement.length > 0 && (
      <>
      <div className="">
        <div className="panelKlassement">
          <div className="klassementSpeeldag">
            <h1>Klassement Seizoen</h1>
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
    )}
    {klassement.length  === 0 && (
                <p>Geen seizoen klassement beschikbaar</p>
            )}
    
      </>
  );
}
