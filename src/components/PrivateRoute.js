import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getUser } from '../slices/userSlice'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = useSelector(getUser)

    return (
        <Route {...rest}
            render={props =>
                user.isLogged ?
                    <Component {...props} />
                    :
                    <Redirect to={{
                        pathname: '/',
                        state: { from: props.location }
                    }} />
            }
        />
    )
}

export default PrivateRoute
