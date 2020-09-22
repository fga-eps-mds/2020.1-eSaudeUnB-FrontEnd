import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Landing from './pages/Landing';
import LandingLogin from './pages/LandingLogin';
import LandingSignUp01 from './pages/LandingSignUp01';
import LandingSignUp02 from './pages/LandingSignUp02';
import LoginAdmin from './pages/LoginAdmin';
import AdminMain from './pages/AdminMain';
import PsyCreate from './pages/PsyCreate';
import PatientList from './pages/PatientList';
import PatientRecord from './pages/PatientRecord';
import PsychologistSchedule from './pages/PsychologistSchedule';
import PsychologistCalendar from './pages/PsychologistCalendar';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/home" exact component={Home} />
                <Route path="/login" component={LandingLogin} />
                <Route
                    path="/registration-step01"
                    component={LandingSignUp01}
                />
                <Route
                    path="/registration-step02"
                    component={LandingSignUp02}
                />
                <Route path="/admin/login" component={LoginAdmin} />
                <Route path="/admin/psy/list" component={AdminMain} />
                <Route path="/admin/psy/create" component={PsyCreate} />
                <Route path="/patient-list" exact component={PatientList} />
                <Route path="/patient-list/:id" component={PatientRecord} />
                <Route
                    path="/psychology/schedule"
                    component={PsychologistSchedule}
                />
                <Route
                    path="/psychology/calendar"
                    component={PsychologistCalendar}
                />
            </Switch>
        </BrowserRouter>
    );
}
