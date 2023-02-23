import { act, render, screen } from '@testing-library/react';
import App from "./App"
import InfoBox from './components/dashboard/InfoBox';
import '@testing-library/jest-dom/extend-expect';
import ReactDOM from 'react-dom';
import DonutChart from './components/dashboard/DonutChart';


describe("Testing render, infoboxes", () => {
  it("should paste given text", () =>{
    render(<InfoBox title="Lisenser" numberOfLicenses = {10}/>);
    expect(
      screen.getByText(/Lisenser/)
    ).toBeInTheDocument();
  });
});


it("renders donutchart without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<DonutChart />, div);
  ReactDOM.unmountComponentAtNode(div);
});







