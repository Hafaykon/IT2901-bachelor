import React from 'react';
import {render, waitFor} from '@testing-library/react';
import {RecoilRoot} from 'recoil';
import LicensePool from "./LicensePool";
import {MemoryRouter} from 'react-router-dom';
import renderer from "react-test-renderer";
import '@testing-library/jest-dom';
describe('LicensePool', () => {
    it('renders without crashing', () => {
        render(
            <MemoryRouter>
                <RecoilRoot>
                    <LicensePool/>
                </RecoilRoot>
            </MemoryRouter>
        );
    });

    it('matches snapshot', async () => {
        const testRenderer = renderer.create(
            <MemoryRouter>
                <RecoilRoot>
                    <LicensePool/>
                </RecoilRoot>
            </MemoryRouter>
        );
        expect(testRenderer.toJSON()).toMatchSnapshot();
    })


    it('displays the software search bar and license pool table when data is available', async () => {
        const {getByTestId, queryByTestId} = render(
            <MemoryRouter>
                <RecoilRoot>
                    <LicensePool/>
                </RecoilRoot>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(getByTestId('autocomplete-search')).toBeInTheDocument();
        });
    });
});