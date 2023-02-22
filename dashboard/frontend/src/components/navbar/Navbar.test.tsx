import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './NavBar';
import '@testing-library/jest-dom/extend-expect';

// Test that the navbar is rendered
{/* MemoryRouter is used because 
This error message indicates that you're trying to use the useLocation hook outside of a Router component.
The useLocation hook is part of the react-router-dom library and can only be used within a Router component or one of its descendants.
To fix this error, you need to make sure that your test file is wrapped in a Router component so that useLocation can be used within it.
*/}
test('renders navbar', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
  const navbarElement = screen.getByTestId('navbar');
  expect(navbarElement).toBeInTheDocument();
});
