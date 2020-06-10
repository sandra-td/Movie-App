import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ( { component: Component, ...rest }) => {


    const routeProps = {
        ...rest,
        render: (props) => {
   let token = localStorage.getItem("token")

        

            return token ? <Component {...props} /> : <Redirect to="/login" />;

        },
    };

    return <Route {...routeProps} />

}

export default PrivateRoute;