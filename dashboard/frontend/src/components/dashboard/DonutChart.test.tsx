import { act, cleanup, render, screen } from '@testing-library/react';
import DonutChart from './DonutChart';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';

/* Mockdata for infoboxdata */
const infoBoxData = {
    total_licenses: 70,
    active_licenses: 40,
    never_used: 10,
    unused_licenses: 30
}

jest.mock('../../api/calls', () => ({
  fetchInfoBoxData: () => Promise.resolve(infoBoxData)
})); 

describe('Testing render, DonutChart', () => {

  beforeEach(async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <DonutChart never_used={infoBoxData.never_used} total_licenses={infoBoxData.total_licenses} unused_licenses={infoBoxData.unused_licenses} active_licenses={infoBoxData.active_licenses}/>
        </MemoryRouter>
      );
    });
  });

  afterEach(() => {
    localStorage.clear();
    cleanup();
  });

  it("renders donutchart without crashing", async () => {
    expect(screen.getByTestId('donutChart')).toBeInTheDocument();
    expect(screen.getByText('Aktiv')).toBeInTheDocument();
    expect(screen.getByText('Ledig')).toBeInTheDocument();
    expect(screen.getByText('Ubrukt')).toBeInTheDocument();
  });

  



});


