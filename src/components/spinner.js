import React from 'react';
import { Spinner } from 'reactstrap';

const LoadingSpinner = () => {
    return (
        <div>
            <Spinner style={{ width: '10rem', height: '10rem' }}color="warning" />
        </div>
    )
}

export default LoadingSpinner