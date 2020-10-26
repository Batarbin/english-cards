import React, {Component} from 'react';

const Error = () => {
    return (
        <div className="error d-flex flex-column text-center align-items-center justify-content-center">
            <h1>Sorry, you found an error, please let me know and try again</h1>
            <a rel="noopener noreferrer" target="_blank" href={'https://github.com/Batarbin/english-cards'} >GitHub</a>
        </div>
    )
}

export default class ErrorBoundry extends Component {
    state = {
        error: false
    }

    componentDidCatch() {
        this.setState({error: true});
    }

    render() {
       if (this.state.error) {
           return <Error />
       }
       return this.props.children;
    }
}