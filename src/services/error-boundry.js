import React, {Component} from 'react';

const Error = () => {
    return <div className="error">Error</div>
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