import { shallow } from 'enzyme';
import React from 'react';
import Landing from '../pages/Landing';

it('Expect to render Landing Page', () => {
    expect(shallow(<Landing />).length).toEqual(1);
});