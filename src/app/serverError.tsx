import React, { FC } from 'react'

const ServerError: FC = () => {
    return (
        <div className="error">
            <h1>500 Internal Server Error</h1>
            <h2 className="mb-4">Maybe you need to run JSON Server first</h2>
            <p>Click <a rel="noopener noreferrer" target="_blank" href="https://github.com/Batarbin/english-cards#scripts" >here</a> to learn scripts</p>
            <p>Click <a rel="noopener noreferrer" target="_blank" href="https://github.com/Batarbin/english-cards/issues" >here</a> if the error keeps showing up after running JSON Server</p>
        </div>
    )
}

export default ServerError