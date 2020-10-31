import * as React from 'react'

const ServerError: React.FC = () => {
    return (
        <div className="error d-flex flex-column text-center align-items-center justify-content-center">
            <h1>500 Internal Server Error</h1>
            <h2>Please let me know and try again</h2>
            <a rel="noopener noreferrer" target="_blank" href="https://github.com/Batarbin/english-cards/issues" >GitHub</a>
        </div>
    )
}

export default ServerError