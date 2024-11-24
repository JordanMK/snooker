"use client";
import Link from "next/link"
import { useState } from "react"

export default function ResetPassword() {
  /*TODO: create backend*/
  const [email, setEmail] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const formSubmit = () => {
    // TODO: 404
  }

  return (
    <form onSubmit={formSubmit} className="mainContainer">
      <div className="titleContainer">
        <div>Wachtwoord vergeten?</div>
      </div>
      <br />
      <input
        type="email"
        placeholder="Typ je e-mail"
        onChange={(e) => setEmail(e.target.value)}
        className="inputBox"
      />
      {passwordError && <label className="errorLabel">{passwordError}</label>}
      <br />
      <button className="button" type="submit">Herstel wachwoord</button>
      <br />
      <div>Terug naar de login pagina <Link href="/login">Klik hier</Link></div>

    </form>
  )
}
