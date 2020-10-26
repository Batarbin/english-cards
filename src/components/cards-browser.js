import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Row, Card, CardImg } from 'reactstrap';
import { loadCardList } from '../actions/cards-browser';
import LoadingSpinner from './spinner';
import '../index.scss';

const mstp = (store) => store
const mdtp = (dispatch) => bindActionCreators({
    loadCardList
}, dispatch)

const CardItem = ({ url, title, pronunciation, translation }) => {
    return (
        <Card body className="text-center justify-content-center mb-4">
            <p>{title}</p>
            <CardImg draggable="false" src={url} alt={title} />    
            <p>Pronunciation: '{pronunciation}'</p>
            <p>Translation: {translation}</p>
        </Card>
    )
}
const Cards = ({ cardList }) => {
    return (
        <div className="cards browser">
            <h3 className="text-center">List of cards:</h3>
            <Row> 
                {cardList.map(cardItem => <CardItem
                    key={cardItem.id}
                    {...cardItem}
                />)}
            </Row>
        </div>
    )
}

class CardsBrowser extends Component {
    componentDidMount() {
        this.props.loadCardList()
    }

    render() {
        const { cardList } = this.props.cardsBrowserReducer

        if (!cardList || !cardList.length) {
            return <LoadingSpinner />
        }

        return (
            <Cards cardList={cardList} />
        )
    }
};

export default connect(mstp, mdtp)(CardsBrowser);