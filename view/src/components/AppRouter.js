import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {Routes} from "../routes";

const AppRouter = () => {
    return (
        <Switch>
            {Routes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={'/alg'}/>
        </Switch>
    );
};

export default AppRouter;