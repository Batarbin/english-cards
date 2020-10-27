import React from 'react';
import { Provider } from 'react-redux';
import { AppRouter } from './router';
import ErrorBoundry from './errorBoundary';
import { store } from './store';


export const App = () => {
    return (
        <Provider store={store} >
            <ErrorBoundry>
                <AppRouter />
            </ErrorBoundry>
        </Provider>
    )
}