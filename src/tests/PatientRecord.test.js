import { shallow } from 'enzyme';
import React from 'react';
import PatientRecord from '../pages/PatientRecord';

it('Expect to render PatientRecord Page', () => {
    expect(shallow(<PatientRecord />).length).toEqual(1);
});
