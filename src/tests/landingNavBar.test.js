import { shallow } from 'enzyme';
import React from 'react';
import LandingNavBar from '../components/LandingNavBar'

it('Expect to render landing Nav Bar Component', () => {
  expect(shallow(<LandingNavBar />).length).toEqual(1)
})