import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingLogin from './pages/LandingLogin';
import LandingSignUp01 from './pages/LandingSignUp01';
import LandingSignUp02 from './pages/LandingSignUp02';
import LoginAdmin from './pages/LoginAdmin';
import AdminMain from './pages/AdminMain';
import PsyCreate from './pages/PsyCreate';
import Home from './pages/home';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={LandingLogin} />
                <Route path="/registration-step01" component={LandingSignUp01} />
                <Route path="/registration-step02" component={LandingSignUp02} />
                <Route path="/home" component={Home} />
                <Route path="/admin/login" component={LoginAdmin} />
                <Route path="/admin/psy/list" component={AdminMain} />
                <Route path="/admin/psy/create" component={PsyCreate} />
          </Switch>
      </BrowserRouter>

    );
}
