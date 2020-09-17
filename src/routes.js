import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import Home from './pages/Home';
import LandingLogin from './pages/LandingLogin';
import LandingSignUp01 from './pages/LandingSignUp01';
import LandingSignUp02 from './pages/LandingSignUp02';
import PatientList from './pages/PatientList';

export default function Routes() {
    return (
      <BrowserRouter>
          <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/home" exact component={Home} />
              <Route path="/login"  component={LandingLogin} />
              <Route path="/registration-step01" component={LandingSignUp01} />
              <Route path="/registration-step02" component={LandingSignUp02} />
              <Route path="/patient-list" component={PatientList} />
            </Switch>
        </BrowserRouter>
    );
}
