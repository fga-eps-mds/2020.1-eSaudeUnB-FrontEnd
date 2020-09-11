import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingLogin from './pages/LandingLogin';
import LandingRegis from './pages/LandingRegis';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={LandingLogin} />
                <Route path="/registration" component={LandingRegis} />
            </Switch>
        </BrowserRouter>
    );
}