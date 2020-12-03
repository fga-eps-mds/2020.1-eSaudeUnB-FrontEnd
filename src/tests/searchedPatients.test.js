import { shallow } from 'enzyme';
import React from 'react';
import SearchedPatients from '../components/SearchedPatients';
import { MemoryRouter } from 'react-router-dom';



it('Expect to render SearchPatients Component', () => {

    expect(shallow
        (<MemoryRouter>
            <SearchedPatients />
        </MemoryRouter>).length).toEqual(1);
});