import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingLogin from './pages/LandingLogin';
import LandingSignUp from './pages/LandingSignUp';
import Home from './pages/home';
import UserProfile from './pages/userProfile'

export default function Routes() {
    return (
      <BrowserRouter>
          <Switch>
              <Route path="/" exact component={LandingLogin} />
              <Route path="/registration" component={LandingSignUp} />
              <Route path="/home" component={Home} />
              <Route path="/profile" component={UserProfile} />
            </Switch>
        </BrowserRouter>
    );
}
