import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppHeader from '../components/app-header';
import Welcome from '../components/welcome';
import Categories from '../components/categories';
import CardsBrowser from '../components/cards-browser';


const App = () => {
    return (
        <div className="app d-flex flex-column align-items-center justify-content-center">
            <AppHeader />
            <Switch>
                <Route path="/" exact component={Welcome} />
                <Route path="/game" component={Categories} />
                <Route path="/cards" component={CardsBrowser} />
            </Switch>
        </div>
    )
}

export default App; 