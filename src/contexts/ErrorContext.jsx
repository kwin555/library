import React, { createContext, useContext, useState } from 'react'
import { useToast } from '@chakra-ui/react'

const ErrorContext = createContext()

export const useError = () => {
  return useContext(ErrorContext)
}

export const ErrorProvider = ({ children }) => {
  const toast = useToast()
  const [error, setError] = useState(null)

  const handleError = (error) => {
    setError(error)
    toast({
      title: 'An error occurred.',
      description: error.message || 'Something went wrong!',
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <ErrorContext.Provider value={{ error, handleError }}>
      {children}
    </ErrorContext.Provider>
  )
}
