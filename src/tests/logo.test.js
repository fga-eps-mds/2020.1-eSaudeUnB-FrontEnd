import { shallow } from 'enzyme';
import React from 'react';
import Logo from '../components/Logo'

it('Expect to render Input Component', () => {
  expect(shallow(<Logo />).length).toEqual(1)
})