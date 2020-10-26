import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Row, Button, Card, CardImg, Alert, UncontrolledCollapse } from 'reactstrap';
import { Fade, Zoom } from "react-awesome-reveal";
import { onItemClick, onBackToCategories, cardsTableLoaded, loadCategories } from '../actions';
import LoadingSpinner from './spinner';
import '../index.scss';

const mstp = (store) => store
const mdtp = (dispatch) => bindActionCreators({
    cardsTableLoaded,
    onItemClick,
    onBackToCategories,
    loadCategories
}, dispatch)

const BackButton = ({ onBackToCategories, preventClear, loadCategories }) => {
    return (
        <Button className="back_button mr-auto p-2" 
            onClick = {() =>  { onBackToCategories(); loadCategories(); preventClear() } }
        >
            Choose another category
        </Button>
    )
}
const AboutCollapse = () => {
    return (
        <div className="toggler p-2">
            <p id="toggler"> What to do? </p>
            <UncontrolledCollapse toggler="#toggler">
                <Card> 
                    Choose a card whose image matches the word in the title
                </Card>
            </UncontrolledCollapse>
        </div>
    )
}
const ResultAlert = ({ result }) => {
    return (<>
        <Zoom>
            <Alert color={result ? 'success' : 'danger'} className="mb-3">
                {result ? 'Hey, good job!' : 'Try again, you can do it!'}
            </Alert> 
        </Zoom>
    </>)
}
const CardItem = ({ onItemClick, isAnswered, title, url, pronunciation, translation }) => {
    return (
        <Card body className={isAnswered ? 'text-center justify-content-center' : 'choose_card text-center justify-content-center pointer'}
            onClick = {() => {!isAnswered && onItemClick(title) } }
        >
            {isAnswered && <p>{title}</p>}
            <CardImg draggable="false" className="card_image" src={url} alt={title} />
            {isAnswered && <p>Pronunciation: '{pronunciation}'</p>}
            {isAnswered && <p>Translation: {translation}</p>}
        </Card>
    )
}
const CardTable = ({ onItemClick, isAnswered, cardsTable, selectedTitle, result, onBackToCategories, loadCategories, count, preventClear }) => {
    return (
        <div className="cards mt-neg">
            <div className="cards_header d-flex mb-5 align-items-center">
                <BackButton onBackToCategories={onBackToCategories} loadCategories={loadCategories} preventClear={preventClear} />
                <AboutCollapse />
            </div>
            <div className="d-flex flex-column text-center align-items-center">
                <h3 className={isAnswered ? "mb-3" : "mb-5"}>Which of these cards is <span>{selectedTitle}</span>?</h3>
                {isAnswered && <ResultAlert result={result}/> }
            </div>
            <Fade direction="up" key={count}> 
                <Row> 
                    {cardsTable.map(cardItem => <CardItem
                        key={cardItem.id}
                        onItemClick={onItemClick}
                        isAnswered={isAnswered}
                        selectedTitle={selectedTitle}
                        {...cardItem}
                    />)}
                </Row> 
            </Fade>
        </div> 
    )
}

class CardGame extends Component {
    _timerID
    clearCards = () => { this.timerID = setTimeout(this.props.cardsTableLoaded, 3000) }
    preventClear = () => { clearTimeout(this.timerID) }

    componentDidMount() {
        this.props.cardsTableLoaded();
    }
    componentDidUpdate = (prevProps) => {
        if (!prevProps.cardGameReducer.isAnswered && this.props.cardGameReducer.isAnswered) {
            this.clearCards();
        }
    }

    render() {
        const { loadCategories, onItemClick, onBackToCategories } = this.props
        const { cardsTable, selectedTitle, isAnswered, result, count } = this.props.cardGameReducer

        if (!cardsTable || !cardsTable.length) {
            return <div className="text-center"> <LoadingSpinner /> </div>
        }
        
        return (
            <CardTable
                preventClear={this.preventClear}
                loadCategories={loadCategories}
                onItemClick={onItemClick}
                isAnswered={isAnswered}
                cardsTable={cardsTable}
                selectedTitle={selectedTitle}
                onBackToCategories={onBackToCategories}
                result={result}
                count={count}
            />
        )
    }
};

export default connect(mstp, mdtp)(CardGame);