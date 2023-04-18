import React from 'react';
import '@testing-library/jest-dom'
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import FAQ from './FAQ';

describe('Testing FAQ page', () => {

    beforeEach(() => {
        render(
            <MemoryRouter>
                <FAQ />
            </MemoryRouter>
        )
    })
    
    afterEach(() => {
        cleanup()
    })

    it('renders without crashing', async() => {
        expect(await screen.findByText('Ofte stilte spørsmål')).toBeInTheDocument();
        expect(await screen.findByText('Lisensdashboard')).toBeInTheDocument();
    })

});