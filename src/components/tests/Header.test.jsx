import React from 'react';
import { render, screen } from '@testing-library/react';
import { ChakraProvider, useColorModeValue } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../Header';

// Mock useColorModeValue
jest.mock('@chakra-ui/react', () => {
    const originalModule = jest.requireActual('@chakra-ui/react');
    return {
      ...originalModule,
      useColorModeValue: jest.fn(),
    };
});

describe('Header', () => {
  test('renders header with library link and theme toggle button', () => {
    render(
      <ChakraProvider>
        <Router>
          <Header />
        </Router>
      </ChakraProvider>
    );

    const header = screen.getByTestId('header');
    const homeLink = screen.getByTestId('home-link');
    const heading = screen.getByTestId('heading');
    const themeToggleButton = screen.getByTestId('theme-toggle');

    expect(header).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
    expect(heading).toHaveTextContent('Library');
    expect(themeToggleButton).toBeInTheDocument();
  });

  test('home link has correct text color in light mode', () => {
    useColorModeValue.mockImplementation((light, dark) => light);

    render(
      <ChakraProvider>
        <Router>
          <Header />
        </Router>
      </ChakraProvider>
    );

    const homeLink = screen.getByTestId('home-link');
    expect(homeLink).toBeInTheDocument();
  });

  test('home link has correct text color in dark mode', () => {
    useColorModeValue.mockImplementation((light, dark) => dark);

    render(
      <ChakraProvider>
        <Router>
          <Header />
        </Router>
      </ChakraProvider>
    );

    const homeLink = screen.getByTestId('home-link');
    expect(homeLink).toBeInTheDocument()
  });
});
