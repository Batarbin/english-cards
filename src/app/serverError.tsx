import * as React from 'react'

const ServerError: React.FC = () => {
    return (
        <div className="error d-flex flex-column text-center align-items-center justify-content-center">
            <h1>500 Internal Server Error</h1>
            <h2 className="mb-4">Maybe you need to run JSON Server first</h2>
            <p>Click <a rel="noopener noreferrer" target="_blank" href="https://github.com/Batarbin/english-cards#scripts" >here</a> to learn scripts</p>
            <p>Click <a rel="noopener noreferrer" target="_blank" href="https://github.com/Batarbin/english-cards/issues" >here</a> if the error keeps showing up after running JSON Server</p>
        </div>
    )
}

export default ServerError