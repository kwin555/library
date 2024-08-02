import { Heading, Stack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import ThemeToggleButton from "./ThemeToggleButton";

const Header = () => {
      // Define background color based on the color mode
  const bgColor = useColorModeValue('gray.200', 'gray.800');
  const textColor = useColorModeValue('blackAlpha.800', 'whiteAlpha.800');
    return (
        <Stack display='flex' flexDirection='row' alignItems='center' justifyContent='space-between' bgColor={bgColor} style={{ position: 'sticky', height: 60, padding: '8px' }}>
            <Heading textColor={textColor}  as='h2' size='2xl'>Library</Heading>
            <ThemeToggleButton />
        </Stack>
    )
}

export default Header;