import { shallow } from 'enzyme';
import React from 'react';
import Logo from '../components/Logo';

it('Expect to render Logo Component', () => {
    expect(shallow(<Logo />).length).toEqual(1);
});
