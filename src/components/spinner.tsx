import * as React from 'react'
import { Spinner } from 'reactstrap'

const LoadingSpinner: React.FC = () => {
    return (
        <div>
            <Spinner style={{ width: '10rem', height: '10rem' }} color="info" />
        </div>
    )
}

export default LoadingSpinner