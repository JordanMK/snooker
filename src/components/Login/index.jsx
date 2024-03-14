import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import Link from 'next/link'

export default function Index(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const formSubmit = () => {
        // You'll update this function later...
    }

    return (
        <form onSubmit={formSubmit} className={styles.mainContainer}>
            <div className={styles.titleContainer}>
                <div>Login</div>
            </div>
            <br />
            <div className={styles.inputContainer}>
                <input
                    value={email}
                    placeholder="Enter your email here"
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.inputBox}
                    type='email'
                />
                <label className="errorLabel">{emailError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    value={password}
                    placeholder="Enter your password here"
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.inputBox}
                    type='password'
                />
                <label className={styles.errorLabel}>{passwordError}</label>
            </div>
            <br />
            <div className={styles.inputContainer}>
                <button className={styles.button} type="submit">Login</button>
            </div>
            <br />
            <div>Forgot password? <Link href="/reset-password">Click here</Link></div>
            <div>Don't have ann account? <Link href="/Register">Register here</Link></div>
        </form>

    )
}