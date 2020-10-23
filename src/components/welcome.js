import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Button } from 'reactstrap';
import { onGameStarted, showInfo } from '../services/actions';
import Dictionary from './dictionary'
import '../index.scss';

const mstp = (store) => store
const mdtp = (dispatch) => bindActionCreators({
    onGameStarted,
    showInfo
}, dispatch)

const PlayGameButton = ({ onGameStarted }) => {
    const history = useHistory();
    return (
        <Button color="info" className="playgame_button"
            onClick = {() => { onGameStarted(); history.push('/game') } }
        >
            Let's play!
        </Button>
    )
}

class Welcome extends Component {
    render() {
        const { onGameStarted, word, showInfo, showInfoBool, wordInfo } = this.props

        return (
            <div className="welcome">
                <div className="welcome-content d-flex flex-column align-items-center justify-content-center">
                    <h1 className="text-center" >Welcome to English Cards!</h1>
                    <img className="svg_animation" src={process.env.PUBLIC_URL + '/cards.svg'} alt='english cards' />
                </div>
                <div className="welcome-form d-flex flex-column text-center align-items-center justify-content-center">
                    <Dictionary 
                        word={word} 
                        showInfo={showInfo}
                        showInfoBool={showInfoBool}
                        wordInfo={wordInfo}
                    />
                    <div className="d-flex flex-row text-center align-items-center justify-content-center">
                        <h5>Or just play the game</h5>
                        <PlayGameButton onGameStarted={onGameStarted} />
                    </div>
                </div>
            </div>
        )
    }
};

export default connect(mstp, mdtp)(Welcome);