import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  ChakraProvider,
  extendBaseTheme,
  ColorModeScript,
} from '@chakra-ui/react'

import App from './App.jsx'
import { BookProvider } from './contexts/BookContext.jsx'
import Header from './components/Header.jsx'
import theme from './theme.js'
import { BrowserRouter } from 'react-router-dom'
import { ErrorProvider } from './contexts/ErrorContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ErrorProvider>
        <BookProvider>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <BrowserRouter>
            <Header />
            <App />
          </BrowserRouter>
        </BookProvider>
      </ErrorProvider>
    </ChakraProvider>
  </React.StrictMode>
)
