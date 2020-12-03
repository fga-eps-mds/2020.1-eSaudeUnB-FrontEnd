import { shallow } from 'enzyme';
import React from 'react';
import Loader from '../components/Loader'

it('Expect to render Input Component', () => {
  expect(shallow(<Loader />).length).toEqual(1)
})