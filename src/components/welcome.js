import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Button } from 'reactstrap'
import { showInfo } from '../actions/dictionaryAction'
import Dictionary from './dictionary'

const mstp = (store) => store
const mdtp = (dispatch) => bindActionCreators({
    showInfo
}, dispatch)

const PlayGameButton = () => {
    const history = useHistory();
    return (
        <Button color="info" className="playgame_button"
            onClick = {() => { history.push('/game') } }
        >
            Let's play!
        </Button>
    )
}

class Welcome extends Component {
    render() {
        const { showInfo } = this.props
        const { showInfoBool, wordInfo } = this.props.welcomeReducer

        return (
            <div className="welcome">
                <div className="welcome-content d-flex flex-column align-items-center justify-content-center">
                    <h1 className="text-center" >Welcome to English Cards!</h1>
                    <img className="svg_animation" draggable="false" src="/images/cards.svg" alt="english cards" />
                    <PlayGameButton />
                </div>
                <div className="welcome-form d-flex flex-column text-center align-items-center justify-content-center">
                    <a rel="noopener noreferrer" target="_blank" href="https://github.com/Batarbin/english-cards">
                        <img className="github_logo" draggable="false" src="/images/github-logo.png" alt="GitHub link" />
                    </a>
                    <Dictionary
                        showInfo={showInfo}
                        showInfoBool={showInfoBool}
                        wordInfo={wordInfo}
                    />
                </div>
            </div>
        )
    }
}

export default connect(mstp, mdtp)(Welcome)