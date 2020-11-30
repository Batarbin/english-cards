import React from 'react'
import { ContinueWithThisGameMode } from '../../actions/cardGameActions'
import { BackToCategoriesButton, BackToGameModesButton, DispatchButton } from '../misc/buttons'


function ResultScreen() {
    return (
        <div className="result_screen">
            <h2>Okay, you are done</h2>
            <div className="result_screen_buttons">
                <BackToCategoriesButton />
                <BackToGameModesButton />
                <DispatchButton className={'continue_button'} firstFunction={ContinueWithThisGameMode} text={'Continue with this game mode'}/>
            </div>
        </div>
    )
}

export default ResultScreen