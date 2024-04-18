'use client'
import React, { useState } from "react"
import styles from "./styles.module.css"
import Link from "next/link"
import Home from "@/app/page"

export default function Index(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [loginFailed, setLoginFailed] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const formSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Client-side validation
        if (!email) {
            setEmailError('Email is required');
            return;
        }
        if (!password) {
            setPasswordError('Password is required');
            return;
        }

        try {
            // Send data to the serverÆ
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            // Handle response
            if (response.ok) {
                setIsLoggedIn(true);
            } else {
                // Handle authentication error
                // For example, display an error message
            }
        } catch (error) {
            console.error('Error:', error);Æ
            // Handle network or other errors
        }

        if (isLoggedIn) {
            return <Home />;
        } else {
            setLoginFailed("Geef de juiste email adress of wachtwoord")
        }
    };

    return (
        <form onSubmit={formSubmit} className={styles.mainContainer}>
            <label className={styles.errorLabel}>{loginFailed}</label>
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
            <label className={styles.errorLabel}>{emailError}</label>
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