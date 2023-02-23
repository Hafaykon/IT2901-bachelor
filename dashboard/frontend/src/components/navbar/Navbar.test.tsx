import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './NavBar';
import '@testing-library/jest-dom/extend-expect';

// Testisng that the navbar is rendered correctly
test('renders navbar', () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
  const navbarElement = screen.getByTestId('navbar');
  expect(navbarElement).toBeInTheDocument();
});

// Testing that the navbar contains the correct links
test('navbar contains correct links', () => {
    render(
        <MemoryRouter>
        <Navbar />
        </MemoryRouter>
    );
    const dashboardLink = screen.getByText('Dashboard');
    const myPageLink = screen.getByText('Min side');
    const licensePoolLink = screen.getByText('Lisensportal');
    const faqLink = screen.getByText('FAQ');
    expect(dashboardLink).toBeInTheDocument();
    expect(myPageLink).toBeInTheDocument();
    expect(licensePoolLink).toBeInTheDocument();
    expect(faqLink).toBeInTheDocument();
    });

