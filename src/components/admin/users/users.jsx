"use client";

import React, { useState, useEffect } from "react";
import { getAllUsers, updateUserBetaald } from "../../api_calls/call.js";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllUsers()
      .then((fetchedUsers) => {
        setUsers(fetchedUsers);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleCheckboxChange = async (event, userId) => {
    const isChecked = event.target.checked;
    const updatedUsers = users.map((user) =>
      user._id === userId ? { ...user, betaald: isChecked } : user
    );
    setUsers(updatedUsers);

    try {
      // Call updateUserBetaald function to update betaald field
      await updateUserBetaald(userId, isChecked);
    } catch (error) {
      console.error("Failed to update user:", error);
      setError("Failed to update user.");
      // Revert the checkbox state if the update fails
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, betaald: !isChecked } : user
        )
      );
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="users">
      <h2>Users</h2>
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {filteredUsers.map((user) => (
        <div
          key={user._id}
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

