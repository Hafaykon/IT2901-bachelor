import React from 'react';
import '@testing-library/jest-dom';
import {cleanup, fireEvent, render, screen, waitFor} from '@testing-library/react';
import ReleaseButton from './ReleaseButton';
import * as recoil from "recoil";
import {RecoilRoot} from "recoil";
import 'isomorphic-fetch';
import renderer from "react-test-renderer";

const mockProps = {
    "id": 1,
    "full_name": "Jannik Georg Solvang",
    "primary_user_email": "kekw",
    'organization': 'fisk',
    'application_name': 'APSIS Pro [Web]',

}


describe('The button for regular users', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve(new Response(JSON.stringify({})))
        );
        render(
            <RecoilRoot> <ReleaseButton spc_id={mockProps.id} primary_user_email={mockProps.full_name}
                                        application_name={mockProps.application_name}
                                        organization={mockProps.organization}/></RecoilRoot>);
    });
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    })


    it('renders without crashing', async () => {
        expect(screen.getByText('Forespør')).toBeInTheDocument();
    })

    it('matches snapshot', async () => {
        const testRenderer = renderer.create(
            <RecoilRoot> <ReleaseButton spc_id={mockProps.id} primary_user_email={mockProps.full_name}
                                        application_name={mockProps.application_name}
                                        organization={mockProps.organization}/></RecoilRoot>
        );
        expect(testRenderer.toJSON()).toMatchSnapshot();
    })

    it('can be clicked', async () => {
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {
        });
        fireEvent.click(screen.getByText('Forespør'));
        await waitFor(() => expect(alertSpy).toHaveBeenCalledWith('Forespørsel sendt sendt til lisensansvarlig!'));
        alertSpy.mockRestore();
    })

})

describe('The button for unit heads', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockImplementation(() =>
            Promise.resolve(new Response(JSON.stringify({})))
        );
        jest.spyOn(recoil, 'useRecoilValue').mockReturnValue({is_unit_head: true});
        render(
            <RecoilRoot> <ReleaseButton spc_id={mockProps.id} primary_user_email={mockProps.full_name}
                                        application_name={mockProps.application_name}
                                        organization={mockProps.organization}/></RecoilRoot>);

    })

    afterEach(() => {
        cleanup();
        jest.restoreAllMocks();
    })

    it('renders with "Frigjør" text', async () => {
        expect(screen.getByText('Frigjør')).toBeInTheDocument();
    })

    it('can be clicked with "Frigjør" text', async () => {
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {
            // do nothing
        });
        fireEvent.click(screen.getByText('Frigjør'));
        await waitFor(() => expect(alertSpy).toHaveBeenCalledWith('Lisens frigjort!'));
        alertSpy.mockRestore();
    })
})
