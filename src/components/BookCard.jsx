import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookContext } from '../contexts/BookContext';
import { Button, Stack, Text, useDisclosure, Box } from '@chakra-ui/react';
import { ModalWrapper } from './Modal';

const BookCard = ({ book }) => {
    const { dispatch } = useBookContext();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const navigate = useNavigate();

    const handleDelete = () => {
        dispatch({ type: 'DELETE_BOOK', payload: book.id });
        onClose();
    };

    return (
        <Box as="article" width='200px' height='200px' marginBottom='12px' aria-labelledby={`book-title-${book.id}`}>
            <Text id={`book-title-${book.id}`} fontSize='x-large'>{book.title}</Text>
            <Text fontSize='medium'>Author: {book.author}</Text>
            <Text fontSize='medium'>Year: {book.year}</Text>
            <Text fontSize='medium'>Genre: {book.genre}</Text>
            <Stack flexDirection='row' justifyContent='space-around'>
                <Button 
                    onClick={() => navigate(`/edit-book/${book.id}`)}
                    aria-label={`Edit ${book.title}`}
                >
                    Edit
                </Button>
                <Button 
                    onClick={onOpen} 
                    aria-haspopup="dialog" 
                    aria-expanded={isOpen} 
                    aria-controls={`delete-modal-${book.id}`}
                >
                    Delete
                </Button>
            </Stack>
            {isOpen && (
                <ModalWrapper
                    id={`delete-modal-${book.id}`}
                    modalTitle={`Delete ${book.title} ?`}
                    isOpen={isOpen}
                    onClose={onClose}
                    onPrimaryAction={handleDelete}
                    modelContent={`Are you sure you want to delete ${book.title}?`}
                    modelCloseText="Delete"
                />
            )}
        </Box>
    );
};

export default BookCard;
