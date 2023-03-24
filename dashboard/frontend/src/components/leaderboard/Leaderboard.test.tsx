import {cleanup, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import { Leaderboard } from './Leaderboard';

describe('Testing render, Navbar', () => {

    beforeEach(() => {
        render(<MemoryRouter>
            <Leaderboard/>
        </MemoryRouter>)
    });

    afterEach(() => {
        cleanup();
    });

    it("renders leaderboard without crashing", () => {
        expect(screen.getByTestId('leaderboard')).toBeInTheDocument();
    });
});