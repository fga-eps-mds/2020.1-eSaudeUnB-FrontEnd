import { shallow } from 'enzyme';
import React from 'react';
import LandingLogin from '../pages/LandingLogin';

it('Expect to render LandingLogin Page', () => {
    expect(shallow(<LandingLogin
    />).length).toEqual(1);
});
