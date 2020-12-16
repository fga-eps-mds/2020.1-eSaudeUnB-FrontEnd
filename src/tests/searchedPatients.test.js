import { shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import SearchedPatients from '../components/SearchedPatients';

it('Expect to render SearchPatients Component', () => {
    expect(shallow(<MemoryRouter>
        <SearchedPatients />
    </MemoryRouter>).length).toEqual(1);
});
