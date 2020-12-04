import { shallow } from 'enzyme';
import React from 'react';
import LoginAdmin from '../pages/LoginAdmin';

it('Expect to render LoginAdmin Page', () => {
    expect(shallow(<LoginAdmin />).length).toEqual(1);
});