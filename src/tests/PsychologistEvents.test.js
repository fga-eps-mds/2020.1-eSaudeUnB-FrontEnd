import { shallow } from 'enzyme';
import React from 'react';
import PsychologistEvents from '../pages/PsychologistEvents';

it('Expect to render PsychologistEvents page', () => {
    expect(shallow(<PsychologistEvents />).length).toEqual(1);
});