import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard'


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={Signup} />   
                <PrivateRoute path="/dashboard" exact component={Dashboard} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
