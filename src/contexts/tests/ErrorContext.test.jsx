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
