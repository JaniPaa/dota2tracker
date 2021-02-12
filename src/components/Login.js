import React, { useState } from "react";
import {
    useHistory
} from 'react-router-dom'

const Login = (props) => {
    const history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [register, setRegister] = useState(false)
    const [regUsername, setRegUsername] = useState("")
    const [regPassword, setRegPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [steamID, setSteamID] = useState("")

    const handleLoginUsernameChange = (e) => {
        e.preventDefault()
        setUsername(e.target.value)
    }

    const handleLoginPasswordChange = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const handleRegisterUsernameChange = (e) => {
        e.preventDefault()
        setRegUsername(e.target.value)
    }

    const handleRegisterPasswordChange = (e) => {
        e.preventDefault()
        setRegPassword(e.target.value)
    }

    const handleRepeatPasswordChange = (e) => {
        e.preventDefault()
        setRepeatPassword(e.target.value)
    }

    const handleSteamIDChange = (e) => {
        e.preventDefault()
        setSteamID(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const loginObject = {
            username: "Ukko-tuc",
            password: "******",
            steamID: 42009225
        }
        props.onLogin(loginObject)
        history.push('/home')
    }

    const onRegister = (e) => {
        e.preventDefault()
        if(regPassword === repeatPassword){
            const registerObject = {
                username: regUsername,
                password: regPassword,
                steamID: steamID
            }
            props.onRegister(registerObject)
            setRegister(false)
            history.push('/home')
        }else{
            alert("The two passwords doesn't match")
        }
    }
    if(!register) {
        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={onSubmit}>
                    <div>
                        <input type="text" value={username} placeholder="username" onChange={handleLoginUsernameChange}></input>
                    </div>
                    <div>
                        <input type="password" placeholder="password" value={password} onChange={handleLoginPasswordChange}></input>
                    </div>
                    <button type="submit">login</button>
                </form>
                <p onClick={e => {
                    setRegister(true)
                }}>Sign up?</p>
            </div>
        )
    }else {
        return (
            <div>
                <h2>Register</h2>
                <button onClick={e => {
                    setRegister(false)
                }}>Back</button>
                <form onSubmit={onRegister}>
                    <div>
                        <input type="text" value={regUsername} placeholder="username" onChange={handleRegisterUsernameChange}></input>
                    </div>
                    <div>
                        <input type="password" placeholder="password" value={regPassword} onChange={handleRegisterPasswordChange}></input>
                        <input type="password" placeholder="Repeat password" value={repeatPassword} onChange={handleRepeatPasswordChange}></input>
                    </div>
                    <div>
                        <input type="text" value={steamID} placeholder="Steam ID" onChange={handleSteamIDChange}></input>
                    </div>
                    <button type="submit">register</button>
                </form>
            </div>
        )
    }
}

export default Login