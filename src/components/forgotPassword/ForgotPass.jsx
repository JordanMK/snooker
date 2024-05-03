'use client'
import React, { useState } from 'react';
import '@/styles/Login.css'
import Link from 'next/link'

export default function ForgotPassword() {
  /*moet nog backend maken*/
  const [email, setEmail] = useState('');
  const [passwordError, setPasswordError] = useState('')


  const formSubmit = () => {
    //update this function later
  }

  //form om email in te vullen
  return (
    <form onSubmit={formSubmit} className="mainContainer">
      <div className="titleContainer">
        <div>Wachtwoord vergeten?</div>
      </div>
      <br />
      <input
        type="email"
        placeholder='Typ je e-mail'
        onChange={(e) => setEmail(e.target.value)}
        className="inputBox"
      />
      <label className="errorLabel">{passwordError}</label>
      <br />
      <button className="button" type='submit'>Herstel wachwoord</button>
      <br />
      <div>Terug naar de login pagina <Link href='/login'>Klik hier</Link></div>

    </form>
  )
}