import React, { useReducer } from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import {
  BookProvider,
  useBookContext,
  bookReducer,
  initialBooks,
  BookContext,
} from '../BookContext'

describe('BookContext', () => {
  describe('bookReducer', () => {
    it('should add a new book', () => {
      const newBook = {
        id: 3,
        title: 'New Book',
        author: 'New Author',
        year: '2022',
        genre: 'Science Fiction',
      }
      const action = { type: 'ADD_BOOK', payload: newBook }

      const state = bookReducer(initialBooks, action)

      expect(state).toContainEqual(newBook)
      expect(state).toHaveLength(initialBooks.length + 1)
    })

    it('should update an existing book', () => {
      const updatedBook = {
        id: 1,
        title: '1984 Updated',
        author: 'George Orwell',
        year: '1949',
        genre: 'Dystopian',
      }
      const action = { type: 'UPDATE_BOOK', payload: updatedBook }

      const state = bookReducer(initialBooks, action)

      expect(state).toContainEqual(updatedBook)
      expect(state.find((book) => book.id === updatedBook.id).title).toBe(
        '1984 Updated'
      )
    })

    it('should delete a book', () => {
      const action = { type: 'DELETE_BOOK', payload: 1 }

      const state = bookReducer(initialBooks, action)

      expect(state.find((book) => book.id === 1)).toBeUndefined()
      expect(state).toHaveLength(initialBooks.length - 1)
    })

    it('should return the current state for unknown action types', () => {
      const action = { type: 'UNKNOWN_ACTION' }

      const state = bookReducer(initialBooks, action)

      expect(state).toEqual(initialBooks)
    })
  })

  describe('BookProvider and useBookContext', () => {
    it('should provide books and dispatch function', () => {
      const wrapper = ({ children }) => <BookProvider>{children}</BookProvider>

      const { result } = renderHook(() => useBookContext(), { wrapper })

      expect(result.current.books).toEqual([])
      expect(typeof result.current.dispatch).toBe('function')
    })

    it('should add a new book via dispatch', async () => {
      const wrapper = ({ children }) => <BookProvider>{children}</BookProvider>

      const { result } = renderHook(() => useBookContext(), { wrapper })

      const newBook = {
        id: 3,
        title: 'New Book',
        author: 'New Author',
        year: '2022',
        genre: 'Science Fiction',
      }

      act(() => {
        result.current.dispatch({ type: 'ADD_BOOK', payload: newBook })
      })
    })

    it('should update a book via dispatch', () => {
      const BookProvider2 = ({ children }) => {
        const [books, dispatch] = useReducer(bookReducer, initialBooks)

        return (
          <BookContext.Provider value={{ books, dispatch }}>
            {children}
          </BookContext.Provider>
        )
      }

      const wrapper = ({ children }) => (
        <BookProvider2>{children}</BookProvider2>
      )

      const { result } = renderHook(() => useBookContext(), { wrapper })

      const updatedBook = {
        id: 1,
        title: '1984 Updated',
        author: 'George Orwell',
        year: '1949',
        genre: 'Dystopian',
      }

      act(() => {
        result.current.dispatch({ type: 'UPDATE_BOOK', payload: updatedBook })
      })

      expect(
        result.current.books.find((book) => book.id === updatedBook.id).title
      ).toBe('1984 Updated')
    })

    it('should delete a book via dispatch', () => {
      const BookProvider2 = ({ children }) => {
        const [books, dispatch] = useReducer(bookReducer, initialBooks)

        return (
          <BookContext.Provider value={{ books, dispatch }}>
            {children}
          </BookContext.Provider>
        )
      }
      const wrapper = ({ children }) => (
        <BookProvider2>{children}</BookProvider2>
      )

      const { result } = renderHook(() => useBookContext(), { wrapper })

      act(() => {
        result.current.dispatch({ type: 'DELETE_BOOK', payload: 1 })
      })

      expect(result.current.books.find((book) => book.id === 1)).toBeUndefined()
    })
  })
})
