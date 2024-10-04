"use client"
import React, { useState } from "react"
// TODO: use a shared stylesheet
import "../login/Login.css"
import Link from "next/link"

export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  // TODO: setEmailError isnt used
  const [emailError, setEmailError] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState(true)
  const [registratieFailed, setRegistratieFailed] = useState("")

  const register = async (event) => {
    event.preventDefault()
    if (password !== confirmPassword || !password || !email || !username) {
      setPasswordError(false)
      setRegistratieFailed("Gegeven velden moeten ingevuld zijn")
      return
    }

    setRegistratieFailed(null)
    setPasswordError(true)

    try {
      const body = { admin: false, username, email: email.toLowerCase(), password }
      const response = await fetch("http://localhost:3001/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      })

      if (response.ok) {
        // TODO: use
        const data = await response.json()
        window.location.href = "/login"
      } else {
        setRegistratieFailed("Dit gebruikersnaam of e-mailadres is bezet")
        console.log("Registratie is NIET GELUKT")
      }
    } catch (error) {
      setRegistratieFailed("Geen reactie van de server")
      console.log("Error met de server")
      console.error("Error:", error)
    }
  }

  return (
    <form onSubmit={register} className="mainContainer">
      {registratieFailed && <label className="errorLabel">{registratieFailed}</label>}
      <div className="titleContainer">
        <div>Registreer</div>
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
  )
}
