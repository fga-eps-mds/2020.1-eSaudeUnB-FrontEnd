import { shallow } from 'enzyme';
import React from 'react';
import NavBar from '../components/NavBar';

it('Expect to render NavBar', () => {
  expect(
    shallow(
        <NavBar className="navBar" bond="Psychologist" />
    ).length
  ).toEqual(1);
});