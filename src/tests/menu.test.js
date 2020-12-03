import { shallow } from 'enzyme';
import React from 'react';
import Menu from '../components/Menu/Menu'

it('Expect to render Input Component', () => {
  expect(shallow(<Menu />).length).toEqual(1)
})