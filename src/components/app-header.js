import React from 'react';
import '../index.scss';

const AppHeader = () => {
  const gitHubLink = 'https://github.com/Batarbin/english_cards',
        logoLink = process.env.PUBLIC_URL + '/cards.svg';
  return (
    <div className="app-header d-flex justify-content-between align-items-center">
        <a className="mr-auto p-2" href="/">
          <img src={logoLink} alt='english cards' />
        </a> 
        <a className="p-2" href="/">Start</a>
        <a className="p-2" href="/cards/">Cards</a>
        <a className="p-2" rel="noopener noreferrer" target="_blank" href={gitHubLink} >GitHub</a>
    </div>
  );
}

export default AppHeader;