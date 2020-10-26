import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { Row, Card, CardImg } from 'reactstrap';
import { Zoom } from "react-awesome-reveal";
import { loadCategories, onCategoryChosen } from '../actions';
import CardGame from './card-game'
import LoadingSpinner from './spinner';
import '../index.scss';

const mstp = (store) => store
const mdtp = (dispatch) => bindActionCreators({
    loadCategories,
    onCategoryChosen
}, dispatch)

const CategoryItem = ({ onCategoryChosen, title, url }) => {
    return (
        <Zoom>
            <Card body className="text-center justify-content-center pointer"
                onClick = {() => onCategoryChosen(title)}
            >
                <span className="capitalize">{title}</span>
                <CardImg draggable="false" src={url} alt={title} />
            </Card>
        </Zoom>
    )
}
const CategoryCards = ({ categories, onCategoryChosen }) => {
    return (
        <div className="cat_cards mt-neg">
            <h3 className="text-center">Please, choose pleasant category</h3>
            <Row>
                {categories.map((catItem, index) => <CategoryItem
                    key={index}
                    onCategoryChosen={onCategoryChosen}
                    {...catItem}
                />)}
            </Row>
        </div>
    )
}

class Categories extends Component {
    componentDidMount() {
        this.props.loadCategories();
    }

    render() {
        const { chosen, categories, onCategoryChosen, chosenCategoryCardList } = this.props;
        
        if ( chosen ) {
            if (!chosenCategoryCardList || !chosenCategoryCardList.length) {
                return <LoadingSpinner />
            }
            
            return <CardGame />
        }
        
        if (!categories || !categories.length) {
            return <LoadingSpinner />
        }
        
        return (
            <CategoryCards 
                onCategoryChosen={onCategoryChosen}
                categories={categories}
            />
        )        
    }
};

export default connect(mstp, mdtp)(Categories);