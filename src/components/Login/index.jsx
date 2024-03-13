import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import Link from 'next/link'

export default function Index(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')


    const buttonClick = () => {
        // You'll update this function later...
    }
    
    return (
        <div className={styles.mainContainer}>
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
                />
                <label className={styles.errorLabel}>{passwordError}</label>
            </div>
            <br />
            <div className={styles.inputContainer}>
                <input className={styles.button-23} type="button" onClick={buttonClick} value={'Log in'} />
            </div>
            <br />
            <div>Forgot password? <Link href="/reset-password">Click here</Link></div>
            <div>Don't have ann account? <a href="">Register here</a></div>
        </div>

    )
}