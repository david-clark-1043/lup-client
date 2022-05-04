import React from "react"
import { Route } from "react-router-dom"
import { EventForm } from "./event/EventForm"
import { EventList } from "./event/EventList"
import { UpdateEvent } from "./event/UpdateEvent"
import { GameForm } from "./game/GameForm"
import { GameList } from "./game/GameList"
import { UpdateGame } from "./game/UpdateGame"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <Route exact path="/">
                <GameList />
            </Route>
            <Route exact path="/games">
                <GameList />
            </Route>
            <Route exact path="/events">
                <EventList />
            </Route>
            <Route exact path="/games/new">
                <GameForm editing={false} />
            </Route>
            <Route exact path="/events/new">
                <EventForm />
            </Route>
            <Route exact path="/events/edit/:eventId(\d+)">
                <UpdateEvent />
            </Route>
            <Route exact path="/games/edit/:gameId(\d+)">
                <GameForm editing={true} />
            </Route>
        </main>
    </>
}
