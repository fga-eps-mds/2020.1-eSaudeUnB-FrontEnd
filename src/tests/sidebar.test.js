import { shallow } from 'enzyme';
import React from 'react';
import SideBar from '../components/SideBar';

it('Expect to render SideBar', () => {
  expect(
    shallow(
        <SideBar className="sideBar" bond="Psychologist" />
    ).length
  ).toEqual(1);
});