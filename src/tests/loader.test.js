import { shallow } from 'enzyme';
import React from 'react';
import Loader from '../components/Loader';

it('Expect to render Loader Component', () => {
    expect(shallow(<Loader />).length).toEqual(1);
});
