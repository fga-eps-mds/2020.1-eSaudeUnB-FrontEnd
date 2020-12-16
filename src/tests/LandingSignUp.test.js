import { shallow } from 'enzyme';
import React from 'react';
import LandingSignUp from '../pages/LandingSignUp';

it('Expect to render LandingSignUp page', () => {
    expect(shallow(<LandingSignUp />).length).toEqual(1);
});
