import React from 'react'
import { useColorMode, Switch } from '@chakra-ui/react'

const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Switch
      data-testid='theme-toggle'
      aria-label={`${colorMode} toggle button`}
      onChange={() => toggleColorMode()}
    >
      {colorMode === 'light' ? '🌑' : '☀️'} Mode
    </Switch>
  )
}

export default ThemeToggleButton
