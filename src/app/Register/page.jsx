'use client'
import { useState } from "react"
import styles from './styles.module.css'


export default function Page() {
    const [name, setName] = useState('')
    const [familyName, setFamilyName] = useState('')
    const [email, setEmail] = useState('')

    const formSubmit = () => {

    }

    return (
        <form onSubmit={formSubmit} className={styles.mainCOntainer}>
            <div className={styles.titleContainer}>
                <div>Register</div>
            </div>
            <br />
            <p>Voornaam</p>
            <input
                value={name}
                placeholder="Geef je naam"
                onChange={(e) => setEmail(e.target.value.email)}
                className={styles.inputBox}
                type="text"
            />

        </form>
    )

}