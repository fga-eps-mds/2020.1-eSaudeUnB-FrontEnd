import { shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import WaitingList from '../pages/WaitingList';

it('Expect to render WaitingList page', () => {
    
    expect(shallow(<MemoryRouter><WaitingList /></MemoryRouter>).length).toEqual(1);
});