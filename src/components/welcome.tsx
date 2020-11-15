import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'reactstrap'
import Dictionary from './dictionary'

const PlayGameButton = () => {
    const history = useHistory()
    return (
        <Button color="info" className="playgame_button"
            onClick = {() => { history.push('/game') } }
        >
            Let's play!
        </Button>
    )
}

function Welcome() {

  return (
    <div className="welcome">
        <div className="welcome-content">
            <h1 className="text-center" >Welcome to English Cards!</h1>
            <img className="svg_animation" draggable="false" src="/images/cards.svg" alt="english cards" />
            <PlayGameButton />
        </div>
        <div className="welcome-form text-center">
            <a rel="noopener noreferrer" target="_blank" href="https://github.com/Batarbin/english-cards">
                <img className="github_logo" draggable="false" src="/images/github-logo.png" alt="GitHub link" />
            </a>
            <Dictionary />
        </div>
    </div>
  )
}

export default Welcome