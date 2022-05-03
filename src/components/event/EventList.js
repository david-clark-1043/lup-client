import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getEvents } from "./EventManager"


export const EventList = (props) => {
    const [events, setEvents] = useState([])
    const history = useHistory()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__title">{event.description} by {event.organizer.user.first_name}</div>
                        <div className="event__games">game: {event.game.title}</div>
                        <div className="event__players">{event.game.number_of_players} players needed</div>
                        <div className="event__skillLevel">Skill level is {event.game.skill_level}</div>
                        <hr />
                    </section>
                })
            }
        </article>
    )
}