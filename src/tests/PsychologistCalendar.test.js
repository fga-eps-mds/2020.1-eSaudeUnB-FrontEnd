import { shallow } from 'enzyme';
import React from 'react';
import PsychologistCalendar from '../pages/PsychologistCalendar';

it('Expect to render PsychologistCalendar Page', () => {
    expect(shallow(<PsychologistCalendar
    />).length).toEqual(1);
});
