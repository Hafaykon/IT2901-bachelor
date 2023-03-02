import { cleanup, render, screen } from '@testing-library/react';
import { SavingsBox } from './SavingsBox';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';


describe('Testing render, DonutChart', () => {

  beforeEach(() => {
    render(<MemoryRouter>
      <SavingsBox title={'Sparing'} savings={100} />
    </MemoryRouter>);
  });

  afterEach(() => {
    cleanup();
  });

  it('renders donutchart without crashing', () => {
    expect(screen.getByText(/Sparing/)).toBeInTheDocument();
    expect(screen.getByTestId('savingsBox')).toBeInTheDocument();
  });


});