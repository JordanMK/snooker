'use client'
import React, { useState } from "react"
import styles from "./styles.module.css"
import Link from "next/link"

export default function Index(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const formSubmit = () => {
        //update this function later...
    }

    return (
        <form onSubmit={formSubmit} className={styles.mainContainer}>
            <div className={styles.titleContainer}>
                <div>Login</div>
            </div>
            <br />
            <input
                value={email}
                placeholder="Typ je e-mail "
                onChange={(e) => setEmail(e.target.value)}
                className={styles.inputBox}
                type="email"
            />
            <label className="errorLabel">{emailError}</label>
            <br />
            <input
                value={password}
                placeholder="Typ je wacthwoord"
                onChange={(e) => setPassword(e.target.value)}
                className={styles.inputBox}
                type="password"
            />
            <label className={styles.errorLabel}>{passwordError}</label>
            <br />
            <button className={styles.button} type="submit">Login</button>
            <br />
            <div>Wachtwoord vergeten?<Link href="/forgotpassword"> Klik hier</Link></div>
            <div>Heb je nog geen account<Link href="/Register"> Registreer hier</Link></div>
        </form>

    )
}