import React from 'react';
import BookList from '../components/BookList';
import { Button, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <VStack height='100%'>
            <BookList />
            <Button onClick={() => navigate('/add-book')}>Add New Book</Button>
        </VStack>
    );
}

export default Home;