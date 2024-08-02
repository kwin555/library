import React from 'react';
import { useColorMode, Switch } from '@chakra-ui/react';

const ThemeToggleButton = () => {
    const { colorMode, toggleColorMode } = useColorMode();
        console.log(colorMode)
    return (
        <Switch onChange={() => toggleColorMode()}>
            {colorMode === 'light' ? '🌑' : '☀️'} Mode
        </Switch>
    );
};

export default ThemeToggleButton;
