import React from 'react';
import { render, screen } from '@testing-library/react';
import { BookProvider } from '../../contexts/BookContext';
import BookList from '../BookList';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Router } from 'react-router-dom';

const mockBooks = [
  { id: 1, title: 'Book One', author: 'Author One', year: 2021, genre: 'Fiction' },
  { id: 2, title: 'Book Two', author: 'Author Two', year: 2020, genre: 'Non-Fiction' },
];


describe('BookList', () => {
  test('renders a list of books', () => {
    render(
    <BrowserRouter>
        <ChakraProvider>
            <BookProvider>
            <BookList />
            </BookProvider>
        </ChakraProvider>
      </BrowserRouter>
    );

    const bookList = screen.getByTestId('book-list');
    expect(bookList).toBeInTheDocument();
    mockBooks.forEach(book => {
      expect(screen.getByTestId(`book-card-${book.id}`)).toBeInTheDocument();
    });
  });
});
