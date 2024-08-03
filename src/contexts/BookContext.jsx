import React, { createContext, useReducer, useContext } from 'react';

export const BookContext = createContext();

export const initialBooks = [
  { id: 1, title: '1984', author: 'George Orwell', year: '1949', genre: 'Dystopian' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: '1960', genre: 'Fiction' },
];

export const bookReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_BOOK':
      return [...state, action.payload];
    case 'UPDATE_BOOK':
      return state.map(book => book.id === action.payload.id ? action.payload : book);
    case 'DELETE_BOOK':
      return state.filter(book => book.id !== action.payload);
    default:
      return state;
  }
};

export const BookProvider = ({ children }) => {
  const [books, dispatch] = useReducer(bookReducer, initialBooks);

  return (
    <BookContext.Provider value={{ books, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => useContext(BookContext);
