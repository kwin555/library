import { Heading, Link, Stack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import ThemeToggleButton from "./ThemeToggleButton";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  const bgColor = useColorModeValue('gray.200', 'gray.800');
  const textColor = useColorModeValue('blackAlpha.800', 'whiteAlpha.800');
  return (
    <Stack
      display='flex'
      flexDirection='row'
      alignItems='center'
      justifyContent='space-between'
      bgColor={bgColor}
      position='sticky'
      top='0'
      height='60px'
      padding='8px'
      zIndex='1000'
      data-testid='header'
    >
      <Link 
        to='/' 
        as={RouterLink} 
        textColor={textColor} 
        aria-label="Library Home"
        data-testid='home-link'
      >
        <Heading 
          aria-label="Library" 
          tabIndex='0' 
          as='h2' 
          size='2xl'
          data-testid='heading'
        >
          Library
        </Heading>
      </Link>
      <ThemeToggleButton />
    </Stack>
  );
}

export default Header;
