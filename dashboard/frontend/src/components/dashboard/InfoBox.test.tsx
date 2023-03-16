import { act, cleanup, render, screen } from '@testing-library/react';
import InfoBox from './InfoBox';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

const infoBoxData = {
  title: 'Totale lisenser',
  NumberOfLicenses: 40,
}

jest.mock('../../api/calls', () => ({
fetchInfoBoxData: () => Promise.resolve(infoBoxData)
})); 

describe('Testing render, infoboxes', () => {

  beforeEach(async () => {
    await act(async () => {
      render(
        <MemoryRouter> 
            <InfoBox title={infoBoxData.title} numberOfLicenses={infoBoxData.NumberOfLicenses} /> 
        </MemoryRouter>
      );
      });
  });

  afterEach(() => {
    localStorage.clear();
    cleanup();
  });

  it('renders without crashing', async () => {
    expect(screen.getByTestId('infoBox-test')).toBeInTheDocument();
    expect(screen.getByText(infoBoxData.title)).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
  });

});





