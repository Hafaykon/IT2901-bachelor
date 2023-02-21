import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import InfoBox from './InfoBox';


describe('Testing render, infoboxes', () => {
  beforeEach(() => {
    render(<InfoBox title='Lisenser' numberOfLicenses={10} />);
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
