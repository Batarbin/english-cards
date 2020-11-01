import React, { FC, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Card, CardImg, Button, Alert, UncontrolledPopover, PopoverBody } from 'reactstrap'
import { Zoom, Fade } from 'react-awesome-reveal'
import { CardTableLoaded, OnCardChosen, OnBackToCategories } from '../actions/cardGameActions'
import { RootStore } from '../app/store'
import LoadingSpinner from './spinner'

interface ResultAlertI {
    result: boolean
    resultCount: number
}
interface CardTableItemI {
    isAnswered: boolean
    title: string
    url: string
    pronunciation: string
    translation: string
}

const BackButton: FC = () => {
    const dispatch = useDispatch()
    return (
        <Button className="back_button mr-auto p-2" 
            onClick = {() =>  dispatch(OnBackToCategories()) }
        >
            Choose another category
        </Button>
    )
}
const AboutCardTablePopover: FC = () => {
    return (
        <div className="toggler p-2">
            <p id="AboutCardTablePopover"> What to do? </p>
            <UncontrolledPopover placement="bottom" target="AboutCardTablePopover">
                <PopoverBody> 
                    Choose a card whose image matches the word in the title
                </PopoverBody>
            </UncontrolledPopover>

        </div>
    )
}
const ResultAlert: FC<ResultAlertI> = ({ result, resultCount }) => {
    return (<>
        <Zoom>
            <Alert color={result ? 'success' : 'danger'} className="mb-3">
                {result ? 
                    resultCount === 0 ? 'Hey, good job!' : `Hey, good job! ${resultCount} in a row!` : 
                    'Try again, you can do it!'}
            </Alert> 
        </Zoom>
    </>)
}
const CardTableItem: FC<CardTableItemI> = ({ isAnswered, title, url, pronunciation, translation }) => {
    const dispatch = useDispatch()
    return (
        <Card body className={isAnswered ? 'text-center justify-content-center' : 'choose_card text-center justify-content-center pointer'}
            onClick = {() => {!isAnswered && dispatch(OnCardChosen(title)) } }
        >
            {isAnswered && <p>{title}</p>}
            <CardImg draggable="false" className="card_image" src={url} alt={title} />
            {isAnswered && <p>Pronunciation: '{pronunciation}'</p>}
            {isAnswered && <p>Translation: {translation}</p>}
        </Card>
    )
}

function CardTable() {
    const dispatch = useDispatch()
    const cardGameState = useSelector((state: RootStore) => state.cardGameState)
    const { cardsTable, isAnswered, result, selectedTitle, animationKey, resultCount } = cardGameState

    // componentDidMount
    useEffect(() => {
        dispatch(CardTableLoaded())
    }, [dispatch])
    // componentDidUpdate
    let timerID: number
    const clearTable = () => {timerID = window.setTimeout(() => { dispatch(CardTableLoaded()) }, 3000)}
    const mounted = useRef(true)
    useEffect(() => {
        if (mounted.current) {
            mounted.current = false
        } 
        if (isAnswered) {
            clearTable()
        }
        return () => {
          clearTimeout(timerID)
        }
    })
    // render
    if (!cardsTable || !cardsTable.length) {
        return <LoadingSpinner />
    }
    return (
        <div className="cards"> 
            <div className="cards_header d-flex align-items-center mt-neg">
                <BackButton />
                <AboutCardTablePopover />
            </div>
            <div className="d-flex flex-column text-center align-items-center">
                <h3 className={isAnswered ? "mb-3" : "mb-5"}>Which of these cards is <span>{selectedTitle}</span>?</h3>
                {isAnswered && <ResultAlert result={result} resultCount={resultCount} /> }
            </div>
            <Fade direction="up" key={animationKey}>
                <Row> 
                    {cardsTable.map(item => <CardTableItem
                        key={item.id}
                        isAnswered={isAnswered}
                        {...item}
                    />)}
                </Row>
            </Fade>
        </div>
    )
}

export default CardTable