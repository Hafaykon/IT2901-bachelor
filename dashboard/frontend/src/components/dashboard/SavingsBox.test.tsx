import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import {SavingsBox} from './SavingsBox';
import '@testing-library/jest-dom/extend-expect';
import {MemoryRouter} from 'react-router-dom';
import { RecoilRoot } from 'recoil';


describe('Testing render, DonutChart', () => {

    beforeEach(() => {
        render(
        <MemoryRouter>
            <RecoilRoot>
                <SavingsBox/>
            </RecoilRoot>
        </MemoryRouter>);
    });

    afterEach(() => {
        cleanup();
    });

    it('renders donutchart without crashing', () => {
        expect(screen.getByText(/Potensiell sparing/)).toBeInTheDocument();
        expect(screen.getByTestId('savingsBox')).toBeInTheDocument();
    });

    it('renders tooltip when hovering over SavingsBox', async () => {
        fireEvent.mouseEnter(screen.getByTestId('savingsBox'))
        await screen.findByRole(/tooltip/);
        expect(screen.getByRole(/tooltip/)).toBeInTheDocument();
    });

});