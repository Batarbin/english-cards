import React, { Component } from 'react';
import { connect } from 'react-redux';

const mstp = (store) => store

class AppHeader extends Component {
    render() {
        if (window.location.pathname === '/') {
            return null
        }

        return (
            <header className="app_header d-flex justify-content-between align-items-center">
                <a className="mr-auto p-2" href="/" >
                <img draggable="false" src="/images/cards.svg" alt="english cards" />
                </a> 
                <a className="p-2" href="/game" >Start</a>
                <a className="p-2" href="/cards/" >Cards</a>
                <a className="p-2" rel="noopener noreferrer" target="_blank" href="https://github.com/Batarbin/english-cards" >GitHub</a>
            </header>
        )
    }
}

export default connect(mstp)(AppHeader);