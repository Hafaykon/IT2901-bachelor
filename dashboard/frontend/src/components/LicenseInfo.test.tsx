import '@testing-library/jest-dom/extend-expect';
import {render, screen} from '@testing-library/react';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import LicenseInfo from './LicenseInfo';

const mockData = [
  {
    application_name: 'Microsoft Test',
    users: [
      {
        full_name: 'Ola Nordmann',
        email: 'ola@example.com',
        total_minutes: 60,
        active_minutes: 30,
      },
    ],
  },
];

jest.mock('../api/calls', () => ({
  fetchSoftwareUsers: () => Promise.resolve(mockData)
}));

describe('LicenseInfo page', () => {
  it('renders the correct license data', async () => {
    render(
      <MemoryRouter initialEntries={['/Totale Lisenser']}>
        <Routes>
          <Route path='/:title' element={<LicenseInfo />} />
        </Routes>
      </MemoryRouter>
    );


    expect(await screen.findByText('Microsoft Test')).toBeInTheDocument();
    expect(screen.getByText('Ola Nordmann')).toBeInTheDocument();
    expect(screen.getByText('ola@example.com')).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });
});
