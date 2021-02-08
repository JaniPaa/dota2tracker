import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch, Route, Link, Redirect
} from "react-router-dom"
import Tracker from './components/Tracker'
import MyStats from './components/MyStats'
import Account from './components/Account'
import Home from "./components/Home";
import Login from "./components/Login";

const padding = { padding: 5 }

const App = () => {

    const [account, setAccount] = useState(null)

    const login = (account) => {
        setAccount(account)
    }

    return (
        <Router>
            <div>
                <Link style={padding} to="/home">Home</Link>
                <Link style={padding} to="/tracker">Tracker</Link>
                <Link style={padding} to="/myStats">My stats</Link>
                <Link style={padding} to="/account">Account</Link>
                {account
                    ? <em>{account.username} logged in</em>
                    : <Link style={padding} to="/login">Login</Link>
                }
                { account ? <button onClick={e => {
                    setAccount(null)
                }}>Logout</button> : null }
            </div>

            <Switch>
                <Route path="/home">
                    <Home />
                </Route>
                <Route path="/tracker">
                    <Tracker />
                </Route>
                <Route path="/account">
                    {account ? <Account account={account}/> : <Redirect to="/login" />}
                </Route>
                <Route path="/myStats">
                    {account ? <MyStats /> : <Redirect to="/login" />}
                </Route>
                <Route path="/login">
                    <Login onLogin={login} />
                </Route>
            </Switch>
        </Router>
    )
}

export default App