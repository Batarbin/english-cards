import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'reactstrap'
import { Zoom } from 'react-awesome-reveal'
import { RootStore } from '../../app/store'
import { BackToCategoriesButton, BackToGameModesButton } from '../misc/buttons'

interface ProgressCounterI {
    resultCount: number
    globalCount: number
}
interface ResultAlertI {
    result: boolean
}
interface TableTitleI {
    keyword: string
    isAnswered: boolean
    selectedTitle: string
}
interface GameHeaderI {
    keyword: string
}

const ProgressCounter: FC<ProgressCounterI> = ({ resultCount, globalCount }) => {
    return (
        <div className="progress_counter text-center">
            {`${globalCount} / 5`}
            {resultCount !== 0 && <p>{resultCount} in a row!</p>}
        </div>
    )
}
const ResultAlert: FC<ResultAlertI> = ({ result }) => {
    return (<>
        <Zoom>
            <Alert color={result ? 'success' : 'danger'} className="mb-3">
                {result ? 'Hey, good job!' : 'Try again, you can do it!'}
            </Alert> 
        </Zoom>
    </>)
}
const TableTitle: FC<TableTitleI> = ({ keyword, isAnswered, selectedTitle }) => {
    if (keyword === 'chooseOne') {
        return (
            <h3 className={isAnswered ? "mb-3" : "mb-5"}>Which of these cards is <span>{selectedTitle}</span>?</h3>
        )
    } else if (keyword === 'writeIt') {
        return (
            <h3 className={isAnswered ? "mb-3" : "mb-5"}>What is this?</h3>
        )
    }

    return (
        <h3 className="mb-5">%INCORRECT TITLE KEYWORD%</h3>
    )
}

const GameHeader: FC<GameHeaderI> = ({ keyword }) => {
    const cardGameState = useSelector((state: RootStore) => state.cardGameState)
    const { result, selectedTitle, isAnswered, resultCount, globalCount } = cardGameState
    
    return (<>
        <div className="game_header d-flex align-items-center">
            <div className="game_header_jb">
                <div className="game_header_jb_buttons">
                    <BackToCategoriesButton />
                    <BackToGameModesButton />
                </div>
                <ProgressCounter resultCount={resultCount} globalCount={globalCount} />
            </div>
            <div className="game_header_title_res">
                <TableTitle keyword={keyword} isAnswered={isAnswered} selectedTitle={selectedTitle} />
                {isAnswered && <ResultAlert result={result} /> }
            </div>  
        </div>
    </>)
}

export default GameHeader