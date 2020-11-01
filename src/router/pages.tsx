import React, { FC, useEffect } from 'react'
import AppHeader from '../components/appHeader'
import Welcome from '../components/welcome'
import CategoriesList from '../components/categoriesList'
import CardList from '../components/cardList'

function Title(title: string) {
    useEffect(() => {
        document.title = `English Cards | ${title}`
    }, [title])
}

export const NoMatchPage: FC = () => {
    Title('404')
    return (<>
        <AppHeader />
        <h1>404 - Not found</h1>
    </>)
}
export const WelcomePage: FC = () => {
    Title('Welcome | Dictionary')
    return (
        <Welcome />
    )
}
export const CardGamePage: FC = () => {
    Title('Card Game')
    return (<>
        <AppHeader />
        <CategoriesList />
    </>)
}
export const CardListPage: FC = () => {
    Title('Card List')
    return (<>
        <AppHeader />
        <CardList />
    </>)
}