import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getSingleEvent, updateEvent } from "./EventManager"
import { getGames } from "../game/GameManager"
import { useHistory } from "react-router-dom"

export const UpdateEvent = () => {
    const { eventId } = useParams()
    const history = useHistory()
    const [currentEvent, setCurrentEvent] = useState({
        date: "",
        time: "",
        game: {id: 0},
        description: "",
    })
    const [games, setGames] = useState([])

    useEffect(
        () => {
            if(eventId) {
                getSingleEvent(eventId)
                    .then(setCurrentEvent)
                getGames()
                    .then(setGames)
            }
        }, [eventId]
    )
    
    const changeEventState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = JSON.parse(JSON.stringify(currentEvent))
        if(domEvent.target.name === "gameId") {
            copy["game"]["id"] = parseInt(domEvent.target.value)
        } else {
            copy[domEvent.target.name] = domEvent.target.value
        }
        setCurrentEvent(copy)
    }

    return <>
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
                        value={currentEvent.game.id}
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
                        game: parseInt(currentEvent.game.id),
                        time: currentEvent.time,
                        organizer: currentEvent.organizer.user.id
                    }

                    // Send POST request to your API
                    updateEvent(currentEvent.id, event)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    </>

}