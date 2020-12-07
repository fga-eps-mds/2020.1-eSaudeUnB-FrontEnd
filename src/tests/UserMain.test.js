import { shallow } from 'enzyme';
import React from 'react';
import UserMain from '../pages/UserMain';

it('Expect to render UserMain page', () => {
    expect(shallow(<UserMain />).length).toEqual(1);
});
