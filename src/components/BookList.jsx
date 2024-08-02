import React from 'react';
import { useBookContext } from '../contexts/BookContext';
import BookCard from './BookCard';
import { Stack } from '@chakra-ui/react';


const BookList = () => {
  const { books } = useBookContext();
  return (
    <Stack width='100%' flexDirection='column' alignItems='center' justifyContent='start'>
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </Stack>
  );
}

export default BookList;
