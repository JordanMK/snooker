import React, { useState, useEffect } from "react";
import { getSpeeldagen, getKlassement, getUserName, getSeizoenen } from "./api_calls/call.js";
import "../app/css/Klassement.css";

export default function KlassementPannel() {
  const [speeldagen, setSpeeldagen] = useState([]);
  const [seizoenen, setSeizoenen] = useState([]);
  const [klassement, setKlassement] = useState([]);
  const [username, setUserName] = useState(null);


  useEffect(() => {
    getSpeeldagen()
      .then((speeldagen) => {
        setSpeeldagen(speeldagen);
        return getKlassement(speeldagen[0]._id);
      })
      .then((klassement) => {
        console.log("Klassement",klassement);
        return klassement
      })
      .then((klassement) => {
        for (let i = 0; i < klassement.length; i++) {
          const userId = klassement[i].user
          fetch(`http://localhost:3001/api/users/${userId}`)
          .then(response => response.json())
          .then(json => {
            const jsonData = JSON.parse(JSON.stringify(json));
            klassement[i].user = jsonData.username
          })
        }
        setKlassement(klassement);
        console.log("Klassement2",klassement);
        }
        
        )

      .catch((error) => {
        console.error(error.message);
      });
  }, []);


  return (
    <>
      <div className="pageContainer">
        <div className="column">
          <h1>Klassement Speeldag</h1>
          <h1>Klassement Seizoen </h1>
          <div className="panelNav">
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
            {/* <a className="a" href="">Show more</a>
            <a className="a" href="">Show more</a> */}
          </div>
        </div>
      </div>
    </>  
  );
}
      