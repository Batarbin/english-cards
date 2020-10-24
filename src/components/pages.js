import React from 'react';
import Welcome from './welcome';
import Categories from './categories';
import CardsBrowser from './cards-browser';

export const WelcomePage = () => {
    return <Welcome />
}

export const CardGamePage = () => {
    return <Categories />
}

export const CardsBrowserPage = () => {
    return <CardsBrowser />
}