import { shallow } from 'enzyme';
import React from 'react';
import PatientList from '../pages/PatientList';

it('Expect to render PatientList Page', () => {
    expect(shallow(<PatientList />).length).toEqual(1);
});