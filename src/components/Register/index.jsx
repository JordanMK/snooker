'use client'
import { useState } from "react"
import styles from '../Login/styles.module.css'
import Link from 'next/link'
import { useFormState } from 'react-dom'




export default function SignupForm() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    var [passwordError, setPasswordError] = useState(true);
    const [registratieFailed, setRegistratieFailed] = useState('')




    const register = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword || !password || !email || !username) {
            setPasswordError(false);
            setRegistratieFailed("Gegeven velden moet ingevuld zijn");
            return;
        } else {
            setRegistratieFailed(null);
            setPasswordError(true);
        }
        console.log(username, email, password);
        try {
            const response = await fetch('http://localhost:3001/api/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({admin: false, username, email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registratie is gelukt met response:', data);
                window.alert("Wachtwoorden momenteel zijn NIET gehashed")
                window.location.href = "/login";
            } else {
                setRegistratieFailed("Dit username of email address is bezet");
                console.log('Registratie is NIET GELUKT');
            }
        } catch (error) {
            setRegistratieFailed("Geen response van server");
            console.log('Error met de server');
            console.error('Error:', error);
        }
    }

    return (
        <form onSubmit={register} className={styles.mainContainer}>
            <label className={styles.errorLabel}>{registratieFailed}</label>
            <div className={styles.titleContainer}>
                <div>Register</div>
            </div>
            <br />
            <label htmlFor="username">Username</label>
            <input
                id='username'
                value={username}
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                className={styles.inputBox}
                type="text"
            />

            <label htmlFor="email">Email</label>
            <input
                value={email}
                placeholder="Geef je email adress"
                onChange={(e) => setEmail(e.target.value)}
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