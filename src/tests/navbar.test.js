import { shallow } from 'enzyme';
import React from 'react';
import NavBar from '../components/NavBar';

it('Expect to render SocialMedias', () => {
  expect(
    shallow(
        <NavBar className="navBar" bond="Psychologist" />
    ).length
  ).toEqual(1);
});