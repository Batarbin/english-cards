import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppHeader from './app-header';
import { CardGamePage, CardsBrowserPage, WelcomePage } from './pages';


const App = () => {
    return (
        <div className="app d-flex flex-column align-items-center justify-content-center">
            <AppHeader />
            <Switch>
                <Route path="/" exact component={WelcomePage} />
                <Route path="/game" component={CardGamePage} />
                <Route path="/cards" component={CardsBrowserPage} />
            </Switch>
        </div>
    )
}

export default App; 