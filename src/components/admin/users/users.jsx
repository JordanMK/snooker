"use client";

import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../api_calls/call.js";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((fetchedUsers) => {
        console.log(fetchedUsers);
        setUsers(fetchedUsers);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, []);

  const handleCheckboxChange = (event, userId) => {
    const isChecked = event.target.checked;
    setUsers(
      users.map((user) =>
        user._id === userId ? { ...user, betaald: isChecked } : user
      )
    );
  };

  return (
    <div className="users">
      <h2>Users</h2>
      {users.map((user, index) => (
        <div
          key={index}
          className="user"
          style={{ backgroundColor: user.betaald ? "lightgreen" : "red" }}
        >
          <p>
            {user.username}
            <span className="checkbox">
              <input
                type="checkbox"
                id={user._id}
                name={user._id}
                checked={user.betaald}
                onChange={(e) => handleCheckboxChange(e, user._id)}
              />
              <label htmlFor={user._id}>Betaald</label>
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}
