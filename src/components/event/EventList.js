import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "./EventManager"


export const EventList = (props) => {
    const [events, setEvents] = useState([])
    const history = useHistory()

    const getAllEvents = () => {
        getEvents().then(data => setEvents(data))
    }

    useEffect(() => {
        getAllEvents()
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
                        <Link to={`/events/edit/${event.id}`}>Edit</Link>
                        <button onClick={(evt) => {
                            deleteEvent(event.id)
                            .then(() => getEvents())
                            .then(data => setEvents(data))
                        }}>Delete</button>
                        {
                            event.joined
                            ? <button onClick={() => {
                                leaveEvent(event.id)
                                    .then(() => getAllEvents())
                                }}>Leave</button>
                                : <button onClick={() => {
                                    joinEvent(event.id)
                                    .then(() => getAllEvents())
                            }}>Join</button>
                        }
                        <hr />
                    </section>
                })
            }
        </article>
    )
}