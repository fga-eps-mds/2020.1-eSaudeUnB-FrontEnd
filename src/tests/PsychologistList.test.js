import { shallow } from 'enzyme';
import React from 'react';
import PsychologistList from '../pages/PsychologistList';

it('Expect to render PsychologistList page', () => {
    expect(shallow(<PsychologistList />).length).toEqual(1);
});