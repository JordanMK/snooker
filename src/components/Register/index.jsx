'use client'
import { useState } from "react"
import styles from '../Login/styles.module.css'
import Link from 'next/link'
import { useFormState } from 'react-dom'




export default function SignupForm() {
    const [voornaam, setVoornaam] = useState('')
    const [familieNaam, setFamilieNaam] = useState('')
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    var [passwordError, setPasswordError] = useState(true);



    const register = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError(false)
        } else {
            setPasswordError(true)
        }

    }

    return (
        <form onSubmit={register} className={styles.mainContainer}>
            <div className={styles.titleContainer}>
                <div>Register</div>
            </div>
            <br />
            <label htmlFor="voornaam">Naam</label>
            <input
                id='voornaam'
                value={voornaam}
                placeholder="Geef je naam"
                onChange={(e) => setVoornaam(e.target.value.setVoornaam)}
                className={styles.inputBox}
                type="text"
            />

            <label htmlFor="familieNaam">Familienaam</label>
            <input
                value={familieNaam}
                id='famielieNaam'
                placeholder="Geef je familienaam"
                onChange={(e) => setFamilieNaam(e.target.value.familieNaam)}
                className={styles.inputBox}
                type="text"
            />

            <label htmlFor="email">Email</label>
            <input
                value={email}
                placeholder="Geef je email adress"
                onChange={(e) => setEmail(e.target.value.setEmail)}
                className={styles.inputBox}
                type="email"
            />
            <label className={styles.errorLabel}>{emailError}</label>
            <label htmlFor="wachtwoord" >Wachtwoord</label>
            <input
                style={{ borderColor: passwordError ? 'grey' : 'red' }}
                id="wachtwoord"
                value={password}
                placeholder="Typ je wacthwoord"
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputBox}
                type="password"
            />
            <label htmlFor="wachtwoord2">Herhaal wachtwoord</label>
            <input
                style={{ borderColor: passwordError ? 'grey' : 'red' }}
                id="wachtwoord2"
                value={confirmPassword}
                placeholder="Typ je wacthwoord"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.inputBox}
                type="password"
            />
            <br />
            <button className={styles.button} type='submit'>Registreer</button>
            <br />
            <div>Terug naar de login pagina <Link href='/login'>Klik hier</Link></div>
        </form>
    )

}