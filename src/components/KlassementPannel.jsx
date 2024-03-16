import React, { useState, useEffect } from "react";
import getUsers from "../components/api_calls/call";
import "../app/css/Klassement.css";

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
      <div className="pageContainer">
        <div className="column smallColumn">
          <h1>Klassement Speeldag</h1>
          <h1>Klassement Seizoen </h1>
          <div className="panelNav">
            <table>
              <thead>
                <tr>
                  <th>Plaats</th>
                  <th>Naam</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.plaats}>
                    <td>{user.plaats}</td>
                    <td>{user.naam}</td>
                    <td>{user.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th>Plaats</th>
                  <th>Naam</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.plaats}>
                    <td>{user.plaats}</td>
                    <td>{user.naam}</td>
                    <td>{user.score}</td>
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
      