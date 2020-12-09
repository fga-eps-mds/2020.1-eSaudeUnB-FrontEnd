import { shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import LandingLogin from '../pages/LandingLogin';

it('Expect to render LandingLogin Page', () => {
    expect(shallow(<MemoryRouter>
        <LandingLogin
    /></MemoryRouter>).length).toEqual(1);
});