import {act, cleanup, render, screen} from '@testing-library/react';
import React from 'react';
import SoftwareSearchBar from './SoftwareSeachBar';
import {RecoilRoot} from 'recoil';
import '@testing-library/jest-dom';

const mockfunc = jest.fn();


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
