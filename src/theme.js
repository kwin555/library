import { extendTheme, theme as chakuraTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: (props) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('whiteAlpha.900', 'gray.900')(props),
    },
  }),
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

const { Button, Heading, Text, Switch, FormErrorMessage, FormHelperText } =
  chakuraTheme.components

const components = {
  Button,
  Text,
  Heading,
  Switch,
  FormErrorMessage,
  FormHelperText,
}

const theme = extendTheme({ config, styles, components })

export default theme
