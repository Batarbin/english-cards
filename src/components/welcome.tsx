import React from 'react'
import Dictionary from './dictionary'
import { RouteButton } from './misc/buttons'

function Welcome() {

  return (
    <div className="welcome">
        <div className="welcome_content">
            <h1 className="text-center" >Welcome to English Cards!</h1>
            <img draggable="false" src="/images/cards.svg" alt="english cards" />
            <RouteButton className={'playgame_button'} path={'/game'} text={`Let's play`} />
        </div>
        <div className="welcome_API text-center">
            <a rel="noopener noreferrer" target="_blank" href="https://github.com/Batarbin/english-cards">
                <img className="github_logo" draggable="false" src="/images/github-logo.png" alt="GitHub link" />
            </a>
            <Dictionary />
        </div>
    </div>
  )
}

export default Welcome