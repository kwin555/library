import React from 'react';
import { useBookContext } from '../contexts/BookContext';
import BookCard from './BookCard';
import { Stack } from '@chakra-ui/react';

const BookList = () => {
  const { books } = useBookContext();
  return (
    <Stack
      width='100%'
      flexDirection='column'
      alignItems='center'
      justifyContent='start'
      data-testid='book-list'
      aria-live='polite'
    >
      {books.map(book => (
        <BookCard key={book.id} book={book} data-testid={`book-card-${book.id}`} />
      ))}
    </Stack>
  );
}

export default BookList;
