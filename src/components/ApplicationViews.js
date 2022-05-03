import React from "react"
import { Route } from "react-router-dom"
import { EventList } from "./event/EventList"
import { GameList } from "./game/GameList"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <Route exact path="/">
                <GameList />
            </Route>
            <Route exact path="/events">
                <EventList />
            </Route>
        </main>
    </>
}
