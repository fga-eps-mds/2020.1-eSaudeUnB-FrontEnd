import { shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import NewSession from '../pages/NewSession';

it('Expect to render NewSession Page', () => {
    expect(shallow(<MemoryRouter>
        <NewSession />
        </MemoryRouter>).length).toEqual(1);
});