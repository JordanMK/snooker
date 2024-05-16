import React, { useState } from "react";
import "@/styles/Login.css";
import Link from "next/link";

export default function SignupForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(true);
    const [registratieFailed, setRegistratieFailed] = useState("");

    const register = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword || !password || !email || !username) {
            setPasswordError(false);
            setRegistratieFailed("Gegeven velden moeten ingevuld zijn");
            return;
        } else {
            setRegistratieFailed(null);
            setPasswordError(true);
        }
        console.log(username, email, password);
        try {
            const response = await fetch("http://localhost:3001/api/users/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ admin: false, username, email: email.toLowerCase(), password }), // Convert email to lowercase
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Registratie is gelukt met response:", data);
                window.alert("Wachtwoorden zijn momenteel NIET gehashed");
                window.location.href = "/login";
            } else {
                setRegistratieFailed("Dit gebruikersnaam of e-mailadres is bezet");
                console.log("Registratie is NIET GELUKT");
            }
        } catch (error) {
            setRegistratieFailed("Geen reactie van de server");
            console.log("Error met de server");
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={register} className="mainContainer">
            <label className="errorLabel">{registratieFailed}</label>
            <div className="titleContainer">
                <div>Register</div>
            </div>
            <br />
            <label htmlFor="username">Username</label>
            <input
                id="username"
                value={username}
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
                className="inputBox"
                type="text"
            />

            <label htmlFor="email">Email</label>
            <input
                value={email}
                placeholder="Geef je e-mailadres"
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                className="inputBox"
                type="email"
            />
            {emailError && <label className="errorLabel">{emailError}</label>}
            <label htmlFor="wachtwoord">Wachtwoord</label>
            <input
                style={{ borderColor: passwordError ? "grey" : "red" }}
                id="wachtwoord"
                value={password}
                placeholder="Typ je wachtwoord"
                onChange={(e) => setPassword(e.target.value)}
                className="inputBox"
                type="password"
            />
            <label htmlFor="wachtwoord2">Herhaal wachtwoord</label>
            <input
                style={{ borderColor: passwordError ? "grey" : "red" }}
                id="wachtwoord2"
                value={confirmPassword}
                placeholder="Typ je wachtwoord"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="inputBox"
                type="password"
            />
            <br />
            <button className="button" type="submit">
                Registreer
            </button>
            <br />
            <div>
                Terug naar de login pagina <Link href="/login">Klik hier</Link>
            </div>
        </form>
    );
}
