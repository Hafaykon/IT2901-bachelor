import {cleanup, render, screen} from '@testing-library/react';
import Navbar from './Navbar';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';

describe('Testing render, Navbar', () => {

    beforeEach(() => {
        render(<MemoryRouter>
            <Navbar/>
        </MemoryRouter>)
    });

    afterEach(() => {
        cleanup();
    });

    it("renders navbar without crashing", () => {
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
    });
});