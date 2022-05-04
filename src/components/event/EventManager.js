import { fetchIt } from "../../utils/Fetch"

export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createEvent = (event) => {
    return fetch("http://localhost:8000/events", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify(event)
    })
        .then(res => res.json())
}
export const updateEvent = (id, event) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        method: "PUT",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify(event)
    })
}

export const deleteEvent = (eventId) => {
    return fetch(`http://localhost:8000/events/${eventId}`, { 
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
    })
}

export const joinEvent = eventId => {
    // TODO: Write the POST fetch request to join and event
    return fetchIt(
        `http://localhost:8000/events/${eventId}/signup`,
        {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        },
        "POST"
    )
}

export const leaveEvent = eventId => {
    // TODO: Write the DELETE fetch request to leave an event
    return fetchIt(
        `http://localhost:8000/events/${eventId}/leave`,
        {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        },
        "DELETE"
    )
}
  