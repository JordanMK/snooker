import React, { useState, useEffect } from "react";
import getUsers from "../components/api_calls/call";
import "../app/css/Klassement.css";
import 'react-bootstrap'

export default function KlassementPannel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUsers();
      setUsers(JSON.parse(result));
    };

    fetchData();
  }, []);

  return (
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
                {users.map((user) => (
                  <tr key={user.plaats}>
                    <td>{user.plaats}</td>
                    <td>{user.naam}</td>
                    <td>{user.score}</td>
                    {/*<table className="score">
                        <thead>
                          <tr>
                            <th>Wedstrijd</th>
                            <th>Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {user.wed.map((wedstrijd) => (
                            <tr key={wedstrijd.nr}>
                              <td>{wedstrijd.nr}</td>
                              <td>{wedstrijd.scores}</td>
                            </tr>
                          ))}
                        </tbody>
                          </table>*/}
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
                {users.map((user) => (
                  <tr key={user.plaats}>
                    <td>{user.plaats}</td>
                    <td>{user.naam}</td>
                    <td>{user.score}</td>
                    {/*<table className="score">
                        <thead>
                          <tr>
                            <th>Wedstrijd</th>
                            <th>Score</th>
                          </tr>
                        </thead>
                        <tbody>
                          {user.wed.map((wedstrijd) => (
                            <tr key={wedstrijd.nr}>
                              <td>{wedstrijd.nr}</td>
                              <td>{wedstrijd.scores}</td>
                            </tr>
                          ))}
                        </tbody>
                          </table>*/}
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
  );
}
