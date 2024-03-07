'use client'
import React, { useState } from 'react'

interface LoginFormProps {
    onLogin: (email: string, password: string) => void;
  }
  
  const loginPage: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onLogin(email, password);
    };
  
    return (
      <>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      </>
    );
  };

export default loginPage