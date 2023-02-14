import { act, render, screen } from '@testing-library/react';
import App from "./App"
import InfoBox from './components/dashboard/InfoBox';
import '@testing-library/jest-dom/extend-expect';


describe("Testing render, infobaxes", () => {
  it("should paste given text", () =>{
    render(<InfoBox title="Lisenser" numberOfLicenses = {10}/>);
    expect(
      screen.getByText(/Lisenser/)
    ).toBeInTheDocument();
  });
});





