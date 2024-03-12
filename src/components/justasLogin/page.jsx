import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const navigate = useNavigate()

    const onButtonClick = () => {
        // You'll update this function later...
    }


}

export default function JustasLogin(props) {
    return (
        <div className={'mainContainer'}>
            <div className={'titleContainer'}>
                <div>Login</div>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    value={Login.email}
                    placeholder="Enter your email here"
                    onChange={(ev) => props.setEmail(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{props.emailError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input
                    value={props.password}
                    placeholder="Enter your password here"
                    onChange={(ev) => props.setPassword(ev.target.value)}
                    className={'inputBox'}
                />
                <label className="errorLabel">{props.passwordError}</label>
            </div>
            <br />
            <div className={'inputContainer'}>
                <input className={'button-23'} type="button" onClick={props.onButtonClick} value={'Log in'} />
            </div>
            <br />
            <div>Forgot password? <a href="">Click here</a></div>
            <div>Don't have ann account? <a href="">Register here</a></div>
        </div>

    )
}