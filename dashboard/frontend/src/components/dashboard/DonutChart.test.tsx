import {cleanup, render, screen} from '@testing-library/react';
import DonutChart from './DonutChart';
import '@testing-library/jest-dom/extend-expect';


describe('Testing render, DonutChart', () => {

  beforeEach(() => {
    render(<DonutChart never_used={10} total_licenses={10} unused_licenses={10} active_licenses={10}/>);
  });

  afterEach(() => {
    cleanup();
  });

  it("renders donutchart without crashing", () => {
    expect(screen.getByTestId('donutChart')).toBeInTheDocument();
  });
});


