import { shallow } from 'enzyme';
import React from 'react';
import AdminMain from '../pages/AdminMain';

it('Expect to render AdminMain Page', () => {
    expect(shallow(<AdminMain />).length).toEqual(1);
});