import { cleanup, render, screen } from '@testing-library/react';
import DonutChart from './DonutChart';
import '@testing-library/jest-dom/extend-expect';


describe('Testing render, DonutChart', () => {

  beforeEach(() => {
    render(<DonutChart/>);
  });

  afterEach(() => {
    cleanup();
  });

  it("renders donutchart without crashing", () => {
    expect(screen.getByTestId('donutChart')).toBeInTheDocument();
  });
});


