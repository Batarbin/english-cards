import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { AppRouter } from '../router/appRouter'
import ErrorBoundry from './errorBoundary'
import { Store } from './store'


export const App: FC = () => {
    return (
        <Provider store={Store} >
            <ErrorBoundry>
                <AppRouter />
            </ErrorBoundry>
        </Provider>
    )
}