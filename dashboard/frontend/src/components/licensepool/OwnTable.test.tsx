import React from 'react';
import '@testing-library/jest-dom';
import {cleanup, render, screen} from "@testing-library/react";
import OwnTable from "./OwnTable";
import {OwnOrgData} from "../../Interfaces";
import userEvent from "@testing-library/user-event";

const mockData: OwnOrgData[] = [
    {
        "application_name": "APSIS Pro [Web]",
        "primary_user_full_name": "Jannik Georg Solvang",
        "computer_name": "TK5CG9428WVV",
        "details": [
            {
                "id": 190955,
                "last_used": "2022-12-14"
            }
        ],
        "status": "Aktiv"
    }
]


describe('The own table', () => {
    beforeEach(() => {
        render(<OwnTable data={mockData}/>);
    })
    afterEach(() => {
        cleanup()
    })

    it('renders without crashing', async () => {
        expect(await screen.findByText('Lisensnavn')).toBeInTheDocument();
        expect(await screen.findByText('Bruker')).toBeInTheDocument();
        expect(await screen.findByText('Løpenummer')).toBeInTheDocument();
        expect(await screen.findByText('Status')).toBeInTheDocument();

    })
    it('Can expand and display expected details', async () => {
        const input = screen.getByTestId('KeyboardArrowDownIcon');
        expect(input).toBeInTheDocument();
        userEvent.click(input);
        expect(await screen.findByText('Detaljer')).toBeInTheDocument();
        expect(await screen.findByText('2022-12-14')).toBeInTheDocument();
        expect(await screen.findByText('Frigjør lisens')).toBeInTheDocument();

    })
})