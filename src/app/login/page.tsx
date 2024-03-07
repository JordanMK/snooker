'use client'
import React, { useState } from 'react'

interface LoginFormProps {
    onLogin: (email: string, password: string) => void;
  }
  
  const LoginPage: React.FC<LoginFormProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onLogin(email, password);
    };
  
    return (
      <>
      <h1>Login</h1>
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

        <div>
          <div>Don't have account yet? <a href=''>Register here</a></div>
        </div>
      </>
    );
  };

export default LoginPage