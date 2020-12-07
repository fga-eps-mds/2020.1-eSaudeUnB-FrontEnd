import { shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import RealizeSearch from '../components/RealizeSearch';

it('Expect to render RealizeSearch Component', () => {
    expect(shallow(<MemoryRouter>
        <RealizeSearch />
    </MemoryRouter>).length).toEqual(1);
});
