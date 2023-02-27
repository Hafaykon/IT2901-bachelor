import { act, cleanup, render, screen, within } from '@testing-library/react';
import React from 'react';
import OrganizationSelector from './OrganizationSelector';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';


/**
 * Mockdata for organizations.
 */
const organizations: string[] = [
  'Aastahagen barnehage',
  'Aktivitetstilbud for hjemmeboende',
  'Arbeidsmiljøenheten'
];

jest.mock('../api/calls', () => ({
  fetchOrganizations: () => Promise.resolve(organizations)
}));


describe('Organization selector', () => {
  beforeEach(async () => {
    await act(async () => {
      render(<OrganizationSelector />);
    });
  });

  afterEach(() => {
    localStorage.clear();
    cleanup();
  });


  it('renders without crashing', async () => {
    expect(screen.getByLabelText('Velg organisasjon')).toBeInTheDocument();
    expect(screen.getByTestId('autocomplete-search')).toBeInTheDocument();
  });


  it('can select an organization', async () => {
    const autocomplete = screen.getByTestId('autocomplete-search');
    const input = within(autocomplete).getByRole('combobox') as HTMLInputElement;
    autocomplete.focus();
    userEvent.click(input);
    expect(screen.getByText('Aastahagen barnehage')).toBeInTheDocument();
    expect(screen.getByText('Aktivitetstilbud for hjemmeboende')).toBeInTheDocument();
    expect(screen.getByText('Arbeidsmiljøenheten')).toBeInTheDocument();
  });
});
