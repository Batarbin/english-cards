import React from 'react';
import CardsServiceContext from './cards-service-context';

const WithCardsService = () => (Wrapped) => {
    return (props) => {
        return (
            <CardsServiceContext.Consumer>
                {
                    (CardsService) => {
                        return <Wrapped {...props} CardsService={CardsService} />
                    }
                }
            </CardsServiceContext.Consumer>
        )
    }
};

export default WithCardsService;