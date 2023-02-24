import { cleanup, render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import '@testing-library/jest-dom/extend-expect';


describe('Testing render, Navbar', () => {

    beforeEach(() => {
      render(<Navbar/>);
    });
  
    afterEach(() => {
      cleanup();
    });
  
    it("renders navbar without crashing", () => {
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
    });
  });