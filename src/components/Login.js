import React, { useState } from "react";
import {
    useHistory
} from 'react-router-dom'

const Login = (props) => {
    const history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsernameChange = (e) => {
        e.preventDefault()
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        const loginObject = {
            username: username,
            password: password
        }
        props.onLogin(loginObject)
        history.push('/home')
    }

    return (
        <div>
            <h2>login</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <input type="text" value={username} placeholder="username" onChange={handleUsernameChange}></input>
                </div>
                <div>
                    <input type="password" placeholder="password" value={password} onChange={handlePasswordChange}></input>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login