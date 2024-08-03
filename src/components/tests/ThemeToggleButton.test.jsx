import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChakraProvider, useColorMode } from '@chakra-ui/react';
import ThemeToggleButton from '../ThemeToggleButton';

// Mock useColorMode
jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react');
  return {
    ...originalModule,
    useColorMode: jest.fn(),
  };
});

describe('ThemeToggleButton', () => {
  let mockToggleColorMode;

  beforeEach(() => {
    mockToggleColorMode = jest.fn();
    useColorMode.mockReturnValue({
      colorMode: 'light',
      toggleColorMode: mockToggleColorMode,
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('renders with light mode', () => {
    render(
      <ChakraProvider>
        <ThemeToggleButton />
      </ChakraProvider>
    );

    const toggleButton = screen.getByTestId('theme-toggle');
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveTextContent('🌑 Mode');
  });

  test('renders with dark mode', () => {
    useColorMode.mockReturnValue({
      colorMode: 'dark',
      toggleColorMode: mockToggleColorMode,
    });

    render(
      <ChakraProvider>
        <ThemeToggleButton />
      </ChakraProvider>
    );

    const toggleButton = screen.getByTestId('theme-toggle');
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toHaveTextContent('☀️ Mode');
  });

  test('toggles color mode on change', () => {
    render(
      <ChakraProvider>
        <ThemeToggleButton />
      </ChakraProvider>
    );

    const toggleButton = screen.getByTestId('theme-toggle');
    fireEvent.click(toggleButton);
    expect(mockToggleColorMode).toHaveBeenCalledTimes(1);
  });
});
