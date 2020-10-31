import * as React from 'react'

interface Props {
    children: React.ReactNode
}
interface State {
    hasError: boolean
}

const Error: React.FC = () => {
    return (
        <div className="error d-flex flex-column text-center align-items-center justify-content-center">
            <h1>Sorry, you found an error, please let me know and try again</h1>
            <a rel="noopener noreferrer" target="_blank" href="https://github.com/Batarbin/english-cards/issues" >GitHub</a>
        </div>
    )
}

export default class ErrorBoundry extends React.Component<Props, State> {
    state: State = {
        hasError: false
    }

    componentDidCatch() {
        this.setState({ hasError: true})
    }

    render() {
        if (this.state.hasError) {
            return (
                <Error />
            )
        }

        return (
            this.props.children
        )
    }
}