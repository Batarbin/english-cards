import React, { FC } from 'react'
import AppHeader from '../components/appHeader'
import Welcome from '../components/welcome'
import CategoriesList from '../components/categoriesList'
import CardList from '../components/cardList'

export const NoMatchPage: FC = () => {
    return (<>
        <AppHeader />
        <h1>404 - Not found</h1>
    </>)
}
export const WelcomePage: FC = () => {
    return (
        <Welcome />
    )
}
export const CardGamePage: FC = () => {
    return (<>
        <AppHeader />
        <CategoriesList />
    </>)
}
export const CardListPage: FC = () => {
    return (<>
        <AppHeader />
        <CardList />
    </>)
}