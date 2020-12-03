import { shallow } from 'enzyme';
import React from 'react';
import Input from '../components/Input'

it('Expect to render Input Component', () => {
  expect(shallow(<Input />).length).toEqual(1)
})