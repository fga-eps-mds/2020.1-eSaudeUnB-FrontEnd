import { shallow } from 'enzyme';
import React from 'react';
import SearchBar from '../components/SearchBar'

it('Expect to render Input Component', () => {
  expect(shallow(<SearchBar />).length).toEqual(1)
})