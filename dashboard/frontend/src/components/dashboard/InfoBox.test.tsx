import { act, cleanup, render, screen } from '@testing-library/react';
import App from '../../App';
import InfoBox from './InfoBox';
import '@testing-library/jest-dom/extend-expect';


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





