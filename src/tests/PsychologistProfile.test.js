import { shallow } from 'enzyme';
import React from 'react';
import PsychologistProfile from '../pages/PsychologistProfile';

it('Expect to render PsychologistProfile page', () => {
    expect(shallow(<PsychologistProfile />).length).toEqual(1);
});