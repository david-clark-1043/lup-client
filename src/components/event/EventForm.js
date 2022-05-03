import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { getGames } from "../game/GameManager.js"
import { createEvent, getEvents } from './EventManager.js'


export const EventForm = () => {
    const history = useHistory()
    const [games, setGames] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentEvent, setCurrentEvent] = useState({
        date: "",
        time: "",
        gameId: 0,
        description: "",
    })

    useEffect(() => {
        // TODO: Get the games, then set the state
        getGames()
            .then(setGames)
    }, [])

    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = JSON.parse(JSON.stringify(currentEvent))
        if(domEvent.target.name === "gameId") {
            copy[domEvent.target.name] = parseInt(domEvent.target.value)
        } else {
            copy[domEvent.target.name] = domEvent.target.value
        }
        setCurrentEvent(copy)
    }

    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="text" name="date" required className="form-control"
                        value={currentEvent.date}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="text" name="time" required className="form-control"
                        value={currentEvent.time}
                        onChange={changeEventState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Type of Game: </label>
                    <select name="gameId"
                        value={currentEvent.gameId}
                        onChange={changeEventState}>
                            <option hidden value="0">Select a game...</option>
                            {games.map(game => {
                                return <option key={`game--${game.id}`} value={game.id}>{game.title}</option>
                            })}
                        </select>
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        date: currentEvent.date,
                        description: currentEvent.description,
                        game: parseInt(currentEvent.gameId),
                        time: currentEvent.time
                    }

                    // Send POST request to your API
                    createEvent(event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}