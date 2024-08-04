import React, { useEffect } from 'react'
import { useBookContext } from '../contexts/BookContext'
import BookCard from './BookCard'
import { Stack } from '@chakra-ui/react'
import { getBooks } from '../api/api'

const BookList = () => {
  const { books, dispatch } = useBookContext()

  const fetchBooks = async () => {
    if (books.length === 0) {
      try {
        const resp = await getBooks()
        console.log(resp)
        dispatch({ type: 'SET_BOOKS', payload: resp })
      } catch (err) {
        console.error(err)
      }
    }
  }
  useEffect(() => {
    fetchBooks()
  }, [])

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
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          data-testid={`book-card-${book.id}`}
        />
      ))}
    </Stack>
  )
}

export default BookList
