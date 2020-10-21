import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import AppHeader from './app-header';
import { CardGamePage, CardsBrowserPage, WelcomePage } from './pages';

const mstp = (store) => store

class App extends Component {
    render() {
        const { isStarted } = this.props
        return (
            <div className="app d-flex flex-column align-items-center justify-content-center">
                {isStarted && <AppHeader />}
                <Switch>
                    <Route path='/' exact component={WelcomePage} />
                    <Route path='/game' component={CardGamePage} />
                    <Route path='/cards' component={CardsBrowserPage} />
                </Switch>
            </div>
        )
    }
}

export default connect(mstp)(App); 