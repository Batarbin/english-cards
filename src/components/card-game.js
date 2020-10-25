import React, {Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Row, Button, Card, CardImg, Alert, UncontrolledCollapse } from 'reactstrap';
import { Fade, Zoom } from "react-awesome-reveal";
import { loadData, onItemClick, onBackToCategories, cardsTableLoaded } from '../services/actions';
import LoadingSpinner from './spinner';
import '../index.scss';

const mstp = (store) => store
const mdtp = (dispatch) => bindActionCreators({
    loadData,
    cardsTableLoaded,
    onItemClick,
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
const CardTable = ({ onItemClick, isAnswered, chosenCategory, selectedTitle, result, onBackToCategories, loadData }) => {
    return (
        <div className="cards mt-neg">
            <div className="cards_header d-flex mb-5 align-items-center">
                <BackButton onBackToCategories={onBackToCategories} loadData={loadData} />
                <AboutCollapse />
            </div>
            <div className="d-flex flex-column text-center align-items-center">
                <h3 className={isAnswered ? "mb-3" : "mb-5"}>Which of these cards is <span>{selectedTitle}</span>?</h3>
                {isAnswered && <ResultAlert result={result}/> }
            </div>
            <Fade direction="up"> 
                <Row> 
                    {chosenCategory.map(cardItem => <CardItem
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
        this.props.cardsTableLoaded();
    }
    componentDidUpdate = (prevProps) => {
        if (!prevProps.isAnswered && this.props.isAnswered) {
            clearCards(this.props.cardsTableLoaded, 3000)
        }
    }

    render() {
        const { chosenCategory, selectedTitle,
            onItemClick, isAnswered, onBackToCategories, loadData, result } = this.props;

        if (!chosenCategory || !chosenCategory.length) {
            return <div className="text-center"> <LoadingSpinner /> </div>
        }
        
        return (
            <CardTable
                onItemClick={onItemClick}
                isAnswered={isAnswered}
                chosenCategory={chosenCategory}
                selectedTitle={selectedTitle}
                onBackToCategories={onBackToCategories}
                loadData={loadData}
                result={result}
            />
        )
    }
};

export default connect(mstp, mdtp)(CardGame);