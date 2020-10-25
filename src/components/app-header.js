import React from 'react';
import '../index.scss';

const AppHeader = () => {
  const gitHubLink = 'https://github.com/Batarbin/english-cards',
        logoLink = process.env.PUBLIC_URL + '/cards.svg';
  return (
    <header className="app-header d-flex justify-content-between align-items-center">
        <a className="mr-auto p-2" href="/" >
          <img draggable="false" src={logoLink} alt="english cards" />
        </a> 
        <a className="p-2" href="/game" >Start</a>
        <a className="p-2" href="/cards/" >Cards</a>
        <a className="p-2" rel="noopener noreferrer" target="_blank" href={gitHubLink} >GitHub</a>
    </header>
  );
}

export default AppHeader;