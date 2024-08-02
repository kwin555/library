import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookContext } from '../contexts/BookContext';
import styled from 'styled-components';
import { Button, Stack, Text } from '@chakra-ui/react';

const BookCard = ({ book }) => {
    console.log(book)
    const { dispatch } = useBookContext();
    const navigate = useNavigate();

    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${book.title}?`)) {
            dispatch({ type: 'DELETE_BOOK', payload: book.id });
        }
    }
    console.log(`/edit-book/${book.id}`)
    return (
        <Stack width='200px' height='200px' marginBottom='12px'>
        <Text fontSize='x-large'>{book.title}</Text>
        <Text fontSize='medium'>Author: {book.author}</Text>
        <Text fontSize='medium'>Year: {book.year}</Text>
        <Text fontSize='medium'>Genre: {book.genre}</Text>
        <Stack flexDirection='row' justifyContent='space-around'>
            <Button onClick={() => navigate(`/edit-book/${book.id}`)}>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>
        </Stack>
        </Stack>
    );
}

export default BookCard;
