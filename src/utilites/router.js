import React from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import { createBrowserHistory } from "history"
import AppHeader from '../components/appHeader'
import Welcome from '../components/welcome'
import Categories from '../components/categories'
import CardsBrowser from '../components/cardsBrowser'

const history = createBrowserHistory()

export const AppRouter = () => {
    return (
        <Router history={history}>
            <div className="app d-flex flex-column align-items-center justify-content-center">
                <AppHeader />
                <Switch>
                    <Route path="/" exact component={Welcome} />
                    <Route path="/game" component={Categories} />
                    <Route path="/cards" component={CardsBrowser} />
                </Switch>
            </div>
        </Router>
    )
}