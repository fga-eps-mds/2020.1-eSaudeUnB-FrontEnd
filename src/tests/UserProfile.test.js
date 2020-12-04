import { shallow } from 'enzyme';
import React from 'react';
import UserProfile from '../pages/UserProfile';

it('Expect to render UserProfile page', () => {
    expect(shallow(<UserProfile />).length).toEqual(1);
});