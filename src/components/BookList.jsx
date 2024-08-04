import React, { useEffect } from 'react';
import { useBookContext } from '../contexts/BookContext';
import BookCard from './BookCard';
import { Stack } from '@chakra-ui/react';
import { getBooks } from '../api/api';
import { useError } from '../contexts/ErrorContext';
import { VirtualList } from './VirtualList';

const BookList = () => {
  const { books, dispatch } = useBookContext();
  const { handleError } = useError();

  const fetchBooks = async () => {
    if (books.length === 0) {
      try {
        const resp = await getBooks();
        dispatch({ type: 'SET_BOOKS', payload: resp });
      } catch (err) {
        handleError(err);
      }
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <Stack
      key='book-list'
      width='100%'
      flexDirection='column'
      alignItems='center'
      justifyContent='start'
      data-testid='book-list'
      marginTop='12px'
      aria-live='polite'
    >
      <VirtualList
        books={books}
        renderItem={(book) => book ? <BookCard key={book.id} book={book} /> : null}
      />
    </Stack>
  );
};

export default BookList;
