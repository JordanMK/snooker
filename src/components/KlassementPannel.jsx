import "../app/css/Klassement.css"
import getUsers from '../components/api_calls/call';
import React from "react";

export default function KlassementPannel() {
  // Fetch the user data using the getUsers function
  const fetchUsers = async () => {
    const userJson = await getUsers();
    const data = JSON.parse(userJson);
    return data;
  }

  // Call the fetchUsers function and use the returned data to display the user data
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    fetchUsers().then(data => setUsers(data.users));
  }, []);

  // Check if users is an array
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
              {console.log(users)}
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
