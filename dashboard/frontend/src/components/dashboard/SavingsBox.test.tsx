import { cleanup, render, screen } from '@testing-library/react';
import { SavingsBox } from './SavingsBox';
import '@testing-library/jest-dom/extend-expect';


describe('Testing render, DonutChart', () => {

  beforeEach(() => {
    render(<SavingsBox title={'Sparing'} savings={100}/>);
  });

  afterEach(() => {
    cleanup();
  });

  it("renders donutchart without crashing", () => {
    expect(screen.getByText(/Sparing/)).toBeInTheDocument();
    expect(screen.getByTestId('savingsBox')).toBeInTheDocument();
  });


});