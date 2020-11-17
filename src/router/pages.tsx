import React, { FC, useEffect } from 'react'
import AppHeader from '../components/appHeader'
import Welcome from '../components/welcome'
import CategoriesList from '../components/categoriesList'
import CardCollection from '../components/cardCollection'

function Title(title: string) {
    useEffect(() => {
        document.title = `${title} | English Cards`
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
export const CardCollectionPage: FC = () => {
    Title('Card List')
    return (<>
        <AppHeader />
        <CardCollection />
    </>)
}