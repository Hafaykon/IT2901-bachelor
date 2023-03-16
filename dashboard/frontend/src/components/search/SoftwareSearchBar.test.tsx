import {act, cleanup, render, screen} from '@testing-library/react';
import React from 'react';
import SoftwareSearchBar from './SoftwareSeachBar';
import {RecoilRoot} from 'recoil';
import '@testing-library/jest-dom';

const mockfunc = jest.fn();

const mockData = {
    'full_name': 'Lise Stokken',
    'email': 'lise.stokken@trondheim.kommune.no',
    'total_minutes': 0,
    'active_minutes': 0
};
jest.mock('../../api/calls', () => ({
    fetchOrgSoftwareByName: () => Promise.resolve(mockData)
}));

describe('SoftwareSearchBar', () => {
    beforeEach(async () => {
        await act(async () => {
            render(
                <RecoilRoot>
                    <SoftwareSearchBar data={['1']} setSelectedSoftware={mockfunc}/>
                </RecoilRoot>);
        });
    });

    afterEach(() => {
        cleanup();
    });


    it('renders without crashing', async () => {
        expect(screen.getByLabelText('Søk')).toBeInTheDocument();
        expect(screen.getByTestId('autocomplete-search')).toBeInTheDocument();
    });


});
