import React, { FC } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { WelcomePage, CardGamePage, CardListPage, NoMatchPage } from './pages'

export const AppRouter: FC = () => {
    return (
        <Router>
            <main className="app d-flex flex-column align-items-center justify-content-center">
                <Switch>
                    <Route path="/" exact component={WelcomePage} />
                    <Route path="/game" exact component={CardGamePage} />
                    <Route path="/cards" exact component={CardListPage} />
                    <Route component={NoMatchPage} />
                </Switch>
            </main>
        </Router>
    )
}