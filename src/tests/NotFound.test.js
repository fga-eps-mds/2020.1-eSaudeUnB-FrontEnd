import { shallow } from 'enzyme';
import React from 'react';
import NotFound from '../pages/NotFound';

it('Expect to render NotFound Page', () => {
    expect(shallow(<NotFound />).length).toEqual(1);
});
