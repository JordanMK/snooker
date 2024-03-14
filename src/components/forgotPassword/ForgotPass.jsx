'use client'
import React, { useState } from 'react';
import styles from '../Login/styles.module.css'
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
    <form onSubmit={formSubmit} className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div>Wachtwoord vergeten?</div>
      </div>
      <br />
      <input
        type="email"
        placeholder='Typ je e-mail'
        onChange={(e) => setEmail(e.target.value)}
        className={styles.inputBox}
      />
      <label className={styles.errorLabel}>{passwordError}</label>
      <br />
      <button className={styles.button} type='submit'>Herstel wachwoord</button>
      <br />
      <div>Terug naar de login pagina <Link href='/login'>Klik hier</Link></div>

    </form>
  )
}