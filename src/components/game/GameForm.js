import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { createGame, getGameTypes, getSingleGame, updateGame } from './GameManager.js'


export const GameForm = ( { editing }) => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])
    const { gameId } = useParams()
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    useEffect(() => {
        // TODO: Get the game types, then set the state
        getGameTypes()
            .then(setGameTypes)
        if(editing && gameId){
            getSingleGame(gameId)
                .then(gameToEdit => {
                    gameToEdit["gameTypeId"] = gameToEdit["gameType"]["id"]
                    setCurrentGame(gameToEdit)
                })
        }
    }, [editing, gameId])

    const changeGameState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = JSON.parse(JSON.stringify(currentGame))
        if(domEvent.target.name === "gameTypeId" ||
            domEvent.target.name === "skillLevel" ||
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
                        value={currentGame.gameTypeId}
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
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="number" name="skillLevel" required className="form-control"
                        value={currentGame.skillLevel}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="number" name="numberOfPlayers" required className="form-control"
                        value={currentGame.numberOfPlayers}
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
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        gameType: parseInt(currentGame.gameTypeId)
                    }

                    // Send POST request to your API
                    if(editing) {
                        updateGame(currentGame.id, game)
                            .then(() => history.push("/games"))
                    } else {
                        createGame(game)
                            .then(() => history.push("/games"))
                    }
                }}
                className="btn btn-primary">{editing ? "Update" : "Create"}</button>
        </form>
    )
}