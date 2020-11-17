import React, { FC } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { WelcomePage, CardGamePage, CardCollectionPage, NoMatchPage } from './pages'

export const AppRouter: FC = () => {
    return (
        <Router>
            <main className="app">
                <Switch>
                    <Route path="/" exact component={WelcomePage} />
                    <Route path="/game" exact component={CardGamePage} />
                    <Route path="/collection" exact component={CardCollectionPage} />
                    <Route component={NoMatchPage} />
                </Switch>
            </main>
        </Router>
    )
}