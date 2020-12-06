import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './pages/Landing';
import LandingLogin from './pages/LandingLogin';
import LandingSignUp from './pages/LandingSignUp';
import UserMain from './pages/UserMain';
import UserEvents from './pages/UserEvents';
import PsychologistEvents from './pages/PsychologistEvents';
import UserProfile from './pages/UserProfile';
import LoginAdmin from './pages/LoginAdmin';
import AdminMain from './pages/AdminMain';
import PsychologistCreate from './pages/PsychologistCreate';
import PatientList from './pages/PatientList';
import PatientRecord from './pages/PatientRecord';
import NewSession from './pages/NewSession';
import PsychologistProfile from './pages/PsychologistProfile';
import PsychologistSchedule from './pages/PsychologistSchedule';
import PsychologistCalendar from './pages/PsychologistCalendar';
import PsychologistList from './pages/PsychologistList';
import userSchedule from './pages/UserSchedule';
import NotFound from './pages/NotFound';
import WaitingList from './pages/WaitingList';
import ChangePassword from './pages/ChangePassword';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/main" component={UserMain} />
                <Route path="/psychologist/events" component={PsychologistEvents} />
                <Route path="/profile" component={UserProfile} />
                <Route path="/login" component={LandingLogin} />
                <Route path="/events" component={UserEvents} />
                <Route path="/registration" component={LandingSignUp} />
                <Route path="/admin" exact component={LoginAdmin} />
                <Route path="/admin/psychologist/list" component={AdminMain} />
                <Route path="/admin/psychologist/create" component={PsychologistCreate} />
                <Route path="/psychologist/profile" component={PsychologistProfile} />
                <Route path="/patient/list" exact component={PatientList} />
                <Route path="/psychologist/list" exact component={PsychologistList} />
                <Route path="/psychologist/list/schedule/:email" component={userSchedule} />
                <Route path="/patient/list/:email" component={PatientRecord} />
                <Route path="/psychologist/schedule" component={PsychologistSchedule} />
                <Route path="/psychologist/calendar" component={PsychologistCalendar} />
                <Route path="/new-session" component={NewSession} />
                <Route path="/waiting-list" component={WaitingList} />
                <Route path="/change-password" component={ChangePassword} />
                <Route path="*" component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}
