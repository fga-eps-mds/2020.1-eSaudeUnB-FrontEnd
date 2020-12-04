import { shallow } from 'enzyme';
import React from 'react';
import UserEvents from '../pages/UserEvents';

it('Expect to render UserEvents page', () => {
    expect(shallow(<UserEvents />).length).toEqual(1);
});