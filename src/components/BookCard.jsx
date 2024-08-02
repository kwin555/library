import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookContext } from '../contexts/BookContext';
import { Button, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { ModalWrapper } from './Modal';

const BookCard = ({ book }) => {
    const { dispatch } = useBookContext();
    const { isOpen, onOpen, onClose } = useDisclosure()

    const navigate = useNavigate();

    const handleDelete = () => {
        dispatch({ type: 'DELETE_BOOK', payload: book.id });
        onClose()
    }
    return (
        <Stack width='200px' height='200px' marginBottom='12px'>
            <Text fontSize='x-large'>{book.title}</Text>
            <Text fontSize='medium'>Author: {book.author}</Text>
            <Text fontSize='medium'>Year: {book.year}</Text>
            <Text fontSize='medium'>Genre: {book.genre}</Text>
            <Stack flexDirection='row' justifyContent='space-around'>
                <Button onClick={() => navigate(`/edit-book/${book.id}`)}>Edit</Button>
                <Button onClick={onOpen}>Delete</Button>
            </Stack>
            <ModalWrapper modalTitle={`Delete ${book.title} ?`} isOpen={isOpen} onClose={onClose} onPrimaryAction={handleDelete} modelContent={`Are you sure you want to delete ${book.title}?`} modelCloseText="Delete" />
        </Stack>
    );
}

export default BookCard;
