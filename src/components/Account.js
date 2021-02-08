import React from 'react'

const Account = (props) => {
    return(
        <div>
            <h1>Account</h1>
            <p>username: {props.account.username} </p>
            <p>password: {props.account.password}</p>
        </div>
    )
}

export default Account