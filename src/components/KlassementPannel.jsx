import React, { useState, useEffect } from "react";
import { getSpeeldagen, getKlassement, getUserName, getSeizoenen } from "./api_calls/call.js";
import "../app/css/Klassement.css";

export default function KlassementPannel() {
  const [speeldagen, setSpeeldagen] = useState([]);
  const [klassement, setKlassement] = useState([]);


  useEffect(() => {
    getSpeeldagen()
      .then((speeldagen) => {
        setSpeeldagen(speeldagen);
        return getKlassement(speeldagen[0]._id);
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
      