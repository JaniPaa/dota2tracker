import React from 'react'

const Account = (props) => {
    return(
        <div>
            <h1>Account</h1>
            <p>Username: {props.account.username} </p>
            <p>Password: {props.account.password}</p>
            <p>SteamID: {props.account.steamID}</p>
        </div>
    )
}

export default Account