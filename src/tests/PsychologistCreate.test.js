import { shallow } from 'enzyme';
import React from 'react';
import PsychologistCreate from '../pages/PsychologistCreate';

it('Expect to render PsychologistCreate page', () => {
    expect(shallow(<PsychologistCreate />).length).toEqual(1);
});