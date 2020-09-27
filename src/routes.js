import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import Home from './pages/Home';
import LandingLogin from './pages/LandingLogin';
import LandingSignUp from './pages/LandingSignUp';
import UserProfile from './pages/UserProfile';
import LoginAdmin from './pages/LoginAdmin';
import AdminMain from './pages/AdminMain';
import PsyCreate from './pages/PsyCreate';
import PatientList from './pages/PatientList';
import PatientRecord from './pages/PatientRecord';
import PsyProfile from './pages/PsyProfile';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/home" exact component={Home} />
                <Route path="/profile" component={UserProfile} />
                <Route path="/login" component={LandingLogin} />
                <Route path="/registration" component={LandingSignUp} />
                <Route path="/admin/login" component={LoginAdmin} />
                <Route path="/admin/psy/list" component={AdminMain} />
                <Route path="/admin/psy/create" component={PsyCreate} />
                <Route path="/psy-profile" component={PsyProfile} />
                <Route path="/patient-list" exact component={PatientList} />
                <Route path="/patient-list/:email" component={PatientRecord} />
            </Switch>
        </BrowserRouter>
    );
}
