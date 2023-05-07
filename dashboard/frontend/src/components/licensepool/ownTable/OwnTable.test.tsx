import React from 'react';
import '@testing-library/jest-dom';
import {cleanup, render, screen} from "@testing-library/react";
import OwnTable from "./OwnTable";
import {OwnOrgData} from "../../../Interfaces";
import userEvent from "@testing-library/user-event";
import handleSorting from '../../licenseInfo/LicenseInfo';
import {RecoilRoot} from "recoil";
import renderer from "react-test-renderer";


const mockData: OwnOrgData[] = [
    {
        "application_name": "APSIS Pro [Web]",
        "primary_user_full_name": "Jannik Georg Solvang",
        "primary_user_email": "kekw",
        'organization': 'Test',
        "computer_name": "TK5CG9428WVV",
        "details": [
            {
                "id": 190955,
                "last_used": "2022-12-14",
                "status": "Aktiv",
                "price": 750
            }
        ],
    }
]


describe('The own table', () => {
    beforeEach(() => {
        render(<RecoilRoot><OwnTable data={mockData} handleSorting={handleSorting}/> </RecoilRoot>);

    })
    afterEach(() => {
        cleanup()
    })

    it('renders without crashing', async () => {
        expect(await screen.findByText('Lisensnavn ▼')).toBeInTheDocument();
        expect(await screen.findByText('Bruker ▼')).toBeInTheDocument();
        expect(await screen.findByText('Løpenummer ▼')).toBeInTheDocument();
        expect(await screen.findByText('Status ▼')).toBeInTheDocument();
        expect(await screen.findByText('APSIS Pro [Web]')).toBeInTheDocument();

    })

    it('matches snapshot', async () => {
        const testRenderer = renderer.create(
            <RecoilRoot><OwnTable data={mockData} handleSorting={handleSorting}/> </RecoilRoot>
        ).toJSON();
        expect(testRenderer).toMatchSnapshot();

    })
    it('Can expand and display expected details', async () => {
        const input = screen.getByTestId('KeyboardArrowDownIcon');
        expect(input).toBeInTheDocument();
        userEvent.click(input);
        expect(await screen.findByText('Sist åpnet')).toBeInTheDocument();
        expect(await screen.findByText("14.12.2022 (144 dager siden)")).toBeInTheDocument();
        expect(await screen.findByText('Ingen tillatelse')).toBeInTheDocument();

    })
})