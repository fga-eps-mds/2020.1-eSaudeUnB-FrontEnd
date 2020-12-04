import { shallow } from 'enzyme';
import React from 'react';
import UserSchedule from '../pages/UserSchedule';

it('Expect to render UserSchedule page', () => {
    expect(shallow(<UserSchedule />).length).toEqual(1);
});