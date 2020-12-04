import { shallow } from 'enzyme';
import React from 'react';
import PsychologistSchedule from '../pages/PsychologistSchedule';

it('Expect to render PsychologistSchedule page', () => {
    expect(shallow(<PsychologistSchedule />).length).toEqual(1);
});