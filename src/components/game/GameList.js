import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { deleteGame, getGames } from "./GameManager.js"

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const history = useHistory()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (<>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
                history.push({ pathname: "/games/new" })
            }}
        >Register New Game</button>
        <article className="games">
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.numberOfPlayers} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skillLevel}</div>
                        <Link to={`/games/edit/${game.id}`}>Edit</Link>
                        <button onClick={() => {
                            deleteGame(game.id)
                            .then(() => getGames())
                            .then(data => setGames(data))
                        }}>Delete</button>
                        <hr />
                    </section>
                })
            }
        </article>
    </>
    )
}