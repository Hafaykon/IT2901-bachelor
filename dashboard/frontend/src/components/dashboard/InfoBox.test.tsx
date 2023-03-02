import { cleanup, render, screen } from '@testing-library/react';
import InfoBox from './InfoBox';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';


describe('Testing render, infoboxes', () => {

  beforeEach(() => {
    render(<MemoryRouter> <InfoBox title='Lisenser' numberOfLicenses={10} /> </MemoryRouter>);
  });

  afterEach(() => {
    cleanup();
  });

  it('should paste given text', () => {
    expect(
      screen.getByText(/Lisenser/)
    ).toBeInTheDocument();
  });
});





