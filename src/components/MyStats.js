import React, { useEffect, useState } from 'react'
import axios from 'axios'
import heroes from '../resources/heroes'
import gameModes from '../resources/gameModes'

// steam32 id = 42009225
const MyStats = (props) => {

    const [allHeroes, setAllHeroes] = useState([])
    const [recentMatches, setRecentMatches] = useState([])
    const [myWL, setMyWL] = useState({
        win: 0,
        lose: 0
    })

    const roles = [
        {
            id: 1,
            name: "Safe"
        },
        {
            id: 2,
            name: "Mid"
        },
        {
            id: 3,
            name: "Off"
        }
    ]

    const lobbyTypes = [
        {
            id: 0,
            name: "Normal"
        },
        {
            id: 1,
            name: "Normal"
        },
        {
            id: 7,
            name: "Normal"
        },
        {
            id: 4,
            name: "Bots"
        },
        {
            id: 4,
            name: "Bots"
        }
    ]

    const skill = [
        {
            id: 0,
            name: "-"
        },
        {
            id: 1,
            name: "Normal"
        },
        {
            id: 2,
            name: "High"
        },
        {
            id: 3,
            name: "Very high"
        },
    ]

    /* 
    Function that checks wether the user has won or lost the game.
    OpenDota API returns boolean "true" if the radiant team has won and it also returns the players slot in the game.
    values 0-127 means the player belongs to the radiant team, and values 128-255 the dire.
    */
    function checkWinOrLose(team, win){
        if(team < 128 && win == true){
            return "Win"
        }else if(team < 128 && win == false){
            return "Lose"
        }else if(team > 127 && win == true){
            return "Lose"
        }else return "Win"
    }

    /* 
    Function to determine what hero was played. 
    OpenDota API returns ID based on the played hero, 
    then the ID is used to find the name of the hero located in "heroes.js".
    */
    function getHeroName(id) {
        for (let i = 0; i < heroes.length; i++) {
            if (heroes[i].id === id) {
                console.log(heroes[i].name)
                return heroes[i].name
            }
        }
    }

    /* 
    Function to determine what gamemode was played.
    OpenDota API returns ID based on the gamemode, 
    then the ID is used to find the name of the hero located in "gameModes.js.
    */
    function getGameModeName(id) {
        for(let x = 0; x < gameModes.length; x++){
            if(gameModes[x].id === id){
                return gameModes[x].name
            }
        }
    }

    /* 
    Function to determine on what lane the player was playing in.
    OpenDota API returns ID based on the role/lane, 
    then the ID is used to find the name of the lane.
    */
    function getRoleName(id) {
        for(let y = 0; y < roles.length; y++){
            if(roles[y].id === id){
                return roles[y].name
            }else {
                return "-"
            }
        }
    }

    /* 
    Function to determine on what lobby the player was playing in.
    OpenDota API returns ID based on the lobby type, 
    then the ID is used to find the name of the lobby.
    */
    function getLobbyTypeName(id) {
        for(let i = 0; i < lobbyTypes.length; i++){
            if(lobbyTypes[i].id === id){
                return lobbyTypes[i].name
            }else{
                return "Unknown"
            }
        }
    }

    /* 
    Function to determine on how high skill level the game was.
    OpenDota API returns ID based on the skill level, 
    then the ID is used to display the skill.
    */
    function getSkillName(id) {
        for(let i = 0; i < skill.length; i++){
            if(skill[i].id === id){
                return skill[i].name
            }else {
                return "Unknown"
            }
        }
    }

    /*
    Function to format time to "mm:ss" based on game duration.
    */
    function formatTime(seconds){
        var minutes = Math.floor(seconds/60)

        var seconds = (seconds - minutes * 60).toFixed()

        if(seconds < 10){
            seconds = "0"+seconds
        }

        return `${minutes}:${seconds}`
    }

    /* 
    Table elements are mapped in to a "rows" variable.
    */
    var rows = recentMatches.map(function(match) {
        return (
            <tr>
                <td>{getHeroName(match.hero_id)}</td>
                <td>{getGameModeName(match.game_mode)} - {getLobbyTypeName(match.lobby_type)}</td>
                <td style={{color: checkWinOrLose(match.player_slot, match.radiant_win) === "Win" ? "green" : "red"}}>{checkWinOrLose(match.player_slot, match.radiant_win)}</td>
                <td>{formatTime(match.duration)}</td>
                <td>{match.kills}</td>
                <td>{match.deaths}</td>
                <td>{match.assists}</td>
                <td>{getRoleName(match.lane_role)}</td>
                <td>{getSkillName(match.skill)}</td>
            </tr>
        )
    })

    /* 
    Retrieving data from recent matches, wins and losses based on steamID from OpenDota API
    */
    useEffect(() => {
        axios
            .get(`https://api.opendota.com/api/players/${props.account.steamID}/wl`)
            .then(response => {
                setMyWL(response.data)
            })
        axios.get(`https://api.opendota.com/api/players/${props.account.steamID}/recentMatches`).then(response => {
            setRecentMatches(response.data)
        })
    }, [])

    return (
        <div>
            <div>
                <h1>My stats</h1>
                <h3>In {myWL.win + myWL.lose} games</h3>
                <p>Win rate {(myWL.win / (myWL.lose + myWL.win)).toFixed(2)}%</p>
                <p>Wins: {myWL.win}</p>
                <p>Losses: {myWL.lose}</p>
            </div>
            <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
                <h2>Recent matches</h2>
                <table class="table table-hover table-dark">
                    <tbody>
                        <tr>
                            <th scope="col">Hero</th>
                            <th scope="col">Game mode</th>
                            <th scope="col">Outcome</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Kills</th>
                            <th scope="col">Deaths</th>
                            <th scope="col">Assists</th>
                            <th scope="col">Lane</th>
                            <th scope="col">Skill</th>
                        </tr>
                        {rows}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default MyStats