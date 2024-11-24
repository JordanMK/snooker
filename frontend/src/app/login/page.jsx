"use client";
import React, { useState } from "react";
import Link from "next/link";
import "./Login.css";

// TODO: replace this api call to api calls file

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [loginFailed, setLoginFailed] = useState("");

	const formSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission

		if (!email) {
			setEmailError("Email is required");
			return;
		}
		if (!password) {
			setPasswordError("Password is required");
			return;
		}

		// TODO: replace with api call login()

		try {
      const response = await fetch(process.env.API_URL + "/auth/login", {
				method: "POST",
				headers: new Headers({
					"Content-Type": "application/json",
				}),
				body: JSON.stringify({ email: email.toLowerCase(), password }), // Convert email to lowercase
				credentials: "include",
			});

			if (response.ok) {
				const data = await response.json();
				localStorage.setItem("userID", data.user._id);
				localStorage.setItem("userMail", data.user.email);
				//localStorage.setItem("admin", data.user.admin);

				window.location.href = "/";
			} else {
				setLoginFailed("Geef het juiste e-mailadres of wachtwoord");
				console.error("Login NIET GELUKT");
			}
		} catch (error) {
			setLoginFailed("Geen reactie van de server");
			console.error("Error:", error);
		}
	};

	return (
		<form onSubmit={formSubmit} className="mainContainer">
			{loginFailed && <label className="errorLabel">{loginFailed}</label>}
			<div className="titleContainer">
				<div>Login</div>
			</div>
			<br />
			<input
				value={email}
				placeholder="Typ je e-mail"
				onChange={(e) => setEmail(e.target.value)}
				className="inputBox"
				type="email"
			/>
			{emailError && <label className="errorLabel">{emailError}</label>}
			<br />
			<input
				value={password}
				placeholder="Typ je wachtwoord"
				onChange={(e) => setPassword(e.target.value)}
				className="inputBox"
				type="password"
			/>
			{passwordError && <label className="errorLabel">{passwordError}</label>}
			<br />
			<button className="button" type="submit">
				Login
			</button>
			<br />
			<div>
				Heb je nog geen account? <Link href="/register">Registreer hier</Link>
			</div>
		</form>
	);
}
