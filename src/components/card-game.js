import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Row, Button, Card, CardImg, Alert, UncontrolledCollapse } from 'reactstrap';
import { Fade, Zoom } from "react-awesome-reveal";
import { loadData, onChooseCat, onItemClick, onBackToCategories } from '../services/actions';
import CategoryCards from './categories';
import LoadingSpinner from './spinner';
import '../index.scss';

const mstp = (store) => store
const mdtp = (dispatch) => bindActionCreators({
    loadData,
    onItemClick,
    onChooseCat,
    onBackToCategories
}, dispatch)

let timerID
const clearCards = (prop, timer) => { timerID = setTimeout(prop, timer) }
const BackButton = ({ onBackToCategories, loadData }) => {
    return (
        <Button className="back_button mr-auto p-2" 
            onClick = {() =>  { onBackToCategories(); loadData(); clearTimeout(timerID) } }
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
            <Alert color={result ? 'success' : 'danger'} className='mb-3'>
                {result ? 'Hey, good job!' : 'Try again, you can do it!'}
            </Alert> 
        </Zoom>
    </>)
}
const CardItem = ({ onItemClick, isAnswered, title, url, transcription, translation, selectedTitle }) => {
    return (
        <Card body className={isAnswered ? 'text-center justify-content-center' : 'choose_card text-center justify-content-center pointer'}
            onClick = {() => {!isAnswered && onItemClick(title, selectedTitle) } }
        >
            {isAnswered && <p>{title}</p>}
            <CardImg draggable="false" className="card_image" src={url} alt={title} />
            {isAnswered && <p>Transcription: '{transcription}'</p>}
            {isAnswered && <p>Translation: {translation}</p>}
        </Card>
    )
}
const Cards = ({ onItemClick, isAnswered, cardsCategory, selectedTitle, result, onBackToCategories, loadData }) => {
    return (
        <div className='cards mt-neg'>
            <div className="cards_header d-flex mb-5 align-items-center">
                <BackButton onBackToCategories={onBackToCategories} loadData={loadData} />
                <AboutCollapse />
            </div>
            <div className="d-flex flex-column text-center align-items-center">
                <h3 className={isAnswered ? "mb-3" : "mb-5"}>Which of these cards is <span>{selectedTitle}</span>?</h3>
                {isAnswered && <ResultAlert result={result}/> }
            </div>
            <Fade direction='up'> 
                <Row> 
                    {cardsCategory.map(cardItem => <CardItem
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
    componentDidMount() {
        this.props.loadData();
    }
    componentDidUpdate = (prevProps) => {
        if (!prevProps.isAnswered && this.props.isAnswered) {
            clearCards(this.props.loadData, 5000)
        }
    }

    render() {
        const { chosen, categories, onChooseCat, category,
            foodCards, foodTitle, plantsCards, plantsTitle,
            onItemClick, isAnswered, onBackToCategories, loadData, result } = this.props;

        if ( !chosen ) {
            if (!categories || !categories.length) {
                return <LoadingSpinner />
            }
            return <CategoryCards categories={categories} onChooseCat={onChooseCat} />
        }

        let cardsCategory = category,
            selectedTitle = null;
        if (cardsCategory === 'food') {
            cardsCategory = foodCards
            selectedTitle = foodTitle
        } else if (cardsCategory === 'plants and herbs') {
            cardsCategory = plantsCards
            selectedTitle = plantsTitle
        } 
        
        if (!cardsCategory || !cardsCategory.length) {
            return <div className="text-center"> Loading... </div>
        }
        
        return (
            <Cards 
                onItemClick={onItemClick}
                isAnswered={isAnswered}
                cardsCategory={cardsCategory}
                selectedTitle={selectedTitle}
                onBackToCategories={onBackToCategories}
                loadData={loadData}
                result={result}
            />
        )
    }
};

export default connect(mstp, mdtp)(CardGame);