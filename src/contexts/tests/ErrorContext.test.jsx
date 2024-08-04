import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { ErrorProvider, useError } from '../ErrorContext'
import '@testing-library/jest-dom'

jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react')
  return {
    ...originalModule,
    useToast: jest.fn(),
  }
})

const MockComponent = () => {
  const { handleError } = useError()
  return (
    <>
      <button onClick={() => handleError(new Error('Test Error'))}>
        Trigger Error with Message
      </button>
      <button onClick={() => handleError({})}>
        Trigger Error without Message
      </button>
    </>
  )
}

const TestComponent = () => {
    const { handleError } = useError();
    const triggerError = () => {
      const error = new Error('Test error message');
      handleError(error);
    };
  
    return (
      <button onClick={triggerError} data-testid="trigger-error">
        Trigger Error
      </button>
    );
  };

test('should show toast with error message', async () => {
  const toast = jest.fn()
  require('@chakra-ui/react').useToast.mockReturnValue(toast)

  render(
    <ChakraProvider>
      <ErrorProvider>
        <MockComponent />
      </ErrorProvider>
    </ChakraProvider>
  )

  fireEvent.click(screen.getByText('Trigger Error with Message'))

  await waitFor(() => {
    expect(toast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'An error occurred.',
        description: 'Test Error',
        status: 'error',
      })
    )
  })
})

test('should show toast with default message', async () => {
  const toast = jest.fn()
  require('@chakra-ui/react').useToast.mockReturnValue(toast)

  render(
    <ChakraProvider>
      <ErrorProvider>
        <MockComponent />
      </ErrorProvider>
    </ChakraProvider>
  )

  fireEvent.click(screen.getByText('Trigger Error without Message'))

  await waitFor(() => {
    expect(toast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'An error occurred.',
        description: 'Something went wrong!',
        status: 'error',
      })
    )
  })
})

  test('triggers onCloseComplete when the toast is closed', async () => {
    const { getByTestId } = render(
      <ChakraProvider>
        <ErrorProvider>
          <TestComponent />
        </ErrorProvider>
      </ChakraProvider>
    );

    const triggerButton = getByTestId('trigger-error');
    fireEvent.click(triggerButton);

    // Wait for the toast to appear
    await waitFor(() => screen.getByText(/an error has occured/));

    // Close the toast manually to trigger onCloseComplete
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    // Wait for the error state to be cleared
    await waitFor(() => {
      expect(screen.queryByText('Test error message')).not.toBeInTheDocument();
    });
  });
