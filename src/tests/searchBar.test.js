import { shallow } from 'enzyme';
import React from 'react';
import SearchBar from '../components/SearchBar'

it('Expect to render SearchBar Component', () => {
  expect(shallow(<SearchBar />).length).toEqual(1)
})