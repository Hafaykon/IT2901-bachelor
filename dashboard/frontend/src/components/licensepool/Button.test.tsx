import React from 'react';
import '@testing-library/jest-dom';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import ReleaseButton from './ReleaseButton';


const mockProps = {
    "id": 1,
    "full_name": "Jannik Georg Solvang",
    "primary_user_email": "kekw",
    'organization': 'fisk',
    'application_name': 'APSIS Pro [Web]',

}
const mockFunction = jest.fn();

beforeEach(() => {
    render(<ReleaseButton spc_id={mockProps.id} primary_user_email={mockProps.full_name}
                          application_name={mockProps.application_name} organization={mockProps.organization}/>);
})

afterEach(() => {
    cleanup();
})

describe('The button', () => {
    it('renders without crashing', async () => {
        expect(screen.getByText('Frigjør lisens')).toBeInTheDocument();
    })

    it('can be clicked', async () => {
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {
            // do nothing
        });
        fireEvent.click(screen.getByText('Frigjør lisens'));
        expect(alertSpy).toHaveBeenCalledWith('Du har frigjort lisensen til Jannik Georg Solvang');
        alertSpy.mockRestore();
    })

})