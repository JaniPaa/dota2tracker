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

    function getHeroName(id) {
        for (let i = 0; i < heroes.length; i++) {
            if (heroes[i].id === id) {
                console.log(heroes[i].name)
                return heroes[i].name
            }
        }
    }

    function getGameModeName(id) {
        for(let x = 0; x < gameModes.length; x++){
            if(gameModes[x].id === id){
                return gameModes[x].name
            }
        }
    }

    function getRoleName(id) {
        for(let y = 0; y < roles.length; y++){
            if(roles[y].id === id){
                return roles[y].name
            }
        }
    }

    function getLobbyTypeName(id) {
        for(let i = 0; i < lobbyTypes.length; i++){
            if(lobbyTypes[i].id === id){
                return lobbyTypes[i].name
            }
        }
    }

    function getSkillName(id) {
        for(let i = 0; i < skill.length; i++){
            if(skill[i].id === id){
                return skill[i].name
            }
        }
    }

    var rows = recentMatches.map(function(match) {
        return (
            <tr>
                <td>{getHeroName(match.hero_id)}</td>
                <td>{getGameModeName(match.game_mode)} - {getLobbyTypeName(match.lobby_type)}</td>
                <td>{match.kills}</td>
                <td>{match.deaths}</td>
                <td>{match.assists}</td>
                <td>{getRoleName(match.lane_role)}</td>
                <td>{getSkillName(match.skill)}</td>
            </tr>
        )
    })

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
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
            <div>
                <h1>My stats</h1>
                <h3>In {myWL.win + myWL.lose} games</h3>
                <p>Win rate {(myWL.win / (myWL.lose + myWL.win)).toFixed(2)}%</p>
                <p>Wins: {myWL.win}</p>
                <p>Losses: {myWL.lose}</p>
            </div>
            <div>
                <h2>Recent matches</h2>
                <table class="table table-hover table-dark">
                    <tbody>
                        <tr>
                            <th scope="col">Hero</th>
                            <th scope="col">Game mode</th>
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