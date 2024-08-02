import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendBaseTheme, ColorModeScript } from '@chakra-ui/react'


import App from './App.jsx'
import { BookProvider } from './contexts/BookContext.jsx'
import Header from './components/Header.jsx'
import theme from './theme.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BookProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Header />
        <App />
      </BookProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
