import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { createGame, getGameTypes, getSingleGame, updateGame } from './GameManager.js'


export const UpdateGame = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])
    const { gameId } = useParams()
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skill_level: 1,
        number_of_players: 0,
        title: "",
        maker: "",
        game_type: {id: 0}
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        if(gameId){
            getSingleGame(gameId)
                .then(setCurrentGame)
                .then(() => {
                    return getGameTypes()
                })
                .then(setGameTypes)
        }
    }, [gameId])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = JSON.parse(JSON.stringify(currentGame))
        if(domEvent.target.name === "gameTypeId") {
            copy["game_type"]["id"] = parseInt(domEvent.target.value)
        } else if (domEvent.target.name === "skillLevel" ||
                    domEvent.target.name === "numberOfPlayers") {
            copy[domEvent.target.name] = parseInt(domEvent.target.value)
        } else {
            copy[domEvent.target.name] = domEvent.target.value
        }
        setCurrentGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required className="form-control"
                        value={currentGame.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Type of Game: </label>
                    <select name="gameTypeId"
                        value={currentGame.game_type.id}
                        onChange={changeGameState}>
                            <option hidden value="0">Select a game type...</option>
                            {gameTypes.map(gameType => {
                                return <option key={`gameType--${gameType.id}`} value={gameType.id}>{gameType.label}</option>
                            })}
                        </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skill_level">Skill Level: </label>
                    <input type="number" name="skill_level" required className="form-control"
                        value={currentGame.skill_level}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of Players: </label>
                    <input type="number" name="number_of_players" required className="form-control"
                        value={currentGame.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: parseInt(currentGame.skill_level),
                        game_type: parseInt(currentGame.game_type.id)
                    }

                    // Send POST request to your API
                    updateGame(currentGame.id, game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}