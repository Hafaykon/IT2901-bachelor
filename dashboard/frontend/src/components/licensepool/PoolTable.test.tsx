import React from 'react';
import '@testing-library/jest-dom';
import {cleanup, render, screen} from "@testing-library/react";
import PoolTable from "./PoolTable";
import {LicensePoolData} from "../../Interfaces";
import userEvent from "@testing-library/user-event";
import handleSorting from './LicensePool';

const mockData: LicensePoolData[] = [
    {
        application_name: "Blackfish IE Tab 15",
        freed_by_organization: "IT-tjenesten",
        details: [
            {
                id: 1,
                freed_by_organization: "IT-tjenesten",
                application_name: "Blackfish IE Tab 15",
                date_added: "2023-04-08",
                family: "Blackfish IE Tab",
                family_version: "101500",
                family_edition: "100",
                spc_id: 520185
            }
        ]
    }
];

describe('The pool table', () => {
    beforeEach(() => {
        render(<PoolTable data={mockData} handleSorting={handleSorting}/>);
    })
    afterEach(() => {
        cleanup()
    })
    it('renders without crashing', async () => {
        expect(await screen.findByText('Lisensnavn ▼')).toBeInTheDocument();
        expect(await screen.findByText('IT-tjenesten')).toBeInTheDocument();
        expect(await screen.findByText('navn@email.com')).toBeInTheDocument();

    })
    it('can expand and display expected details', async () => {
        const input = screen.getByTestId('KeyboardArrowDownIcon');
        expect(input).toBeInTheDocument();
        userEvent.click(input);
        expect(await screen.findByText('Detaljer')).toBeInTheDocument();
        expect(await screen.findByText('TK5CG8403ZP7')).toBeInTheDocument();

    })
})