import React from 'react';
import { Row, Card, CardImg } from 'reactstrap';
import { Zoom } from "react-awesome-reveal";
import '../index.scss';

const CategoryItem = ({ onChooseCat, title, url }) => {
    return (
        <Zoom>
            <Card body className='text-center justify-content-center pointer'
                onClick = {() => onChooseCat(title)}
            >
                <span className="capitalize">{title}</span>
                <CardImg src={url} alt={title} />
            </Card>
        </Zoom>
    )
}
const CategoryCards = ({ categories, onChooseCat }) => {
    return (
        <div className='cat_cards mt-neg'>
            <h3 className="text-center">Please, choose pleasant category</h3>
            <Row>
                {categories.map((catItem, index) => <CategoryItem
                    key={index}
                    onChooseCat={onChooseCat}
                    {...catItem}
                />)}
            </Row>
        </div>
    )
}

export default CategoryCards