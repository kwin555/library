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
        <Box 
            as="article" 
            width='200px' 
            height='200px' 
            marginBottom='12px' 
            aria-labelledby={`book-title-${book.id}`}
            data-testid={`book-card-${book.id}`}
        >
            <Text 
                id={`book-title-${book.id}`} 
                fontSize='x-large' 
                data-testid={`book-title-${book.id}`}
            >
                {book.title}
            </Text>
            <Text fontSize='medium' data-testid={`book-author-${book.id}`}>Author: {book.author}</Text>
            <Text fontSize='medium' data-testid={`book-year-${book.id}`}>Year: {book.year}</Text>
            <Text fontSize='medium' data-testid={`book-genre-${book.id}`}>Genre: {book.genre}</Text>
            <Stack flexDirection='row' justifyContent='space-around'>
                <Button 
                    onClick={() => navigate(`/edit-book/${book.id}`)}
                    aria-label={`Edit ${book.title}`}
                    data-testid={`edit-button-${book.id}`}
                >
                    Edit
                </Button>
                <Button 
                    onClick={onOpen} 
                    aria-haspopup="dialog" 
                    aria-expanded={isOpen} 
                    aria-controls={`delete-modal-${book.id}`}
                    data-testid={`delete-button-${book.id}`}
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
                    onSecondaryAction={onClose}
                    secondaryActionText='Cancel'
                    modelContent={`Are you sure you want to delete ${book.title}?`}
                    modelCloseText="Delete"
                />
            )}
        </Box>
    );
};

export default BookCard;
