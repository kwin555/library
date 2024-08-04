import React, { useReducer } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import {
  BookContext,
  BookProvider,
  bookReducer,
} from '../../contexts/BookContext'
import BookList from '../BookList'
import axios from 'axios'
import { ChakraProvider } from '@chakra-ui/react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { BrowserRouter } from 'react-router-dom'
import { ErrorProvider } from '../../contexts/ErrorContext'

jest.mock('axios')

// Mock useVirtualizer hook
jest.mock('@tanstack/react-virtual', () => ({
  useVirtualizer: jest.fn(),
}))

// Mock data for books
const books = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  title: `Book ${i}`,
}))

const mockBooks = [
  {
    id: 1,
    title: 'Book One',
    author: 'Author One',
    year: 2021,
    genre: 'Fiction',
  },
  {
    id: 2,
    title: 'Book Two',
    author: 'Author Two',
    year: 2020,
    genre: 'Non-Fiction',
  },
]

describe('BookList', () => {
  beforeEach(() => {
    // Mock implementation of useVirtualizer
    useVirtualizer.mockImplementation(() => ({
      getVirtualItems: () =>
        mockBooks.slice(0, mockBooks.length).map((book, index) => ({
          key: index,
          index,
          start: index * 200,
          size: 200,
          measureElement: jest.fn(),
        })),
      getTotalSize: () => books.length * 200,
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  test('renders a list of books', async () => {
    axios.get.mockResolvedValueOnce({ data: mockBooks })

    render(
      <BrowserRouter>
        <ChakraProvider>
          <ErrorProvider>
            <BookProvider>
              <BookList />
            </BookProvider>
          </ErrorProvider>
        </ChakraProvider>
      </BrowserRouter>
    )

    // Wait for the books to be fetched and rendered
    await waitFor(() => {
      const bookList = screen.getByTestId('book-list')
      expect(bookList).toBeInTheDocument()

      mockBooks.forEach((book) => {
        expect(screen.getByTestId(`book-card-${book.id}`)).toBeInTheDocument()
      })
    })
  })

  test('renders a list of books > 0', async () => {
    const BookProvider2 = ({ children }) => {
      const [books, dispatch] = useReducer(bookReducer, [
        {
          id: 1,
          title: '1984',
          author: 'George Orwell',
          year: '1949',
          genre: 'Dystopian',
        },
      ])

      return (
        <BookContext.Provider value={{ books, dispatch }}>
          {children}
        </BookContext.Provider>
      )
    }
    axios.get.mockResolvedValueOnce({ data: mockBooks })

    render(
      <BrowserRouter>
        <ChakraProvider>
          <ErrorProvider>
            <BookProvider2>
              <BookList />
            </BookProvider2>
          </ErrorProvider>
        </ChakraProvider>
      </BrowserRouter>
    )

    // Wait for the books to be fetched and rendered
    await waitFor(() => {
      const bookList = screen.getByTestId('book-list')
      expect(bookList).toBeInTheDocument()
    })
  })

  test('renders a list of books === 0', async () => {
    const BookProvider2 = ({ children }) => {
      const [books, dispatch] = useReducer(bookReducer, [])

      return (
        <BookContext.Provider value={{ books, dispatch }}>
          {children}
        </BookContext.Provider>
      )
    }
    axios.get.mockResolvedValueOnce({ data: [] })

    render(
      <BrowserRouter>
        <ChakraProvider>
          <ErrorProvider>
            <BookProvider2>
              <BookList />
            </BookProvider2>
          </ErrorProvider>
        </ChakraProvider>
      </BrowserRouter>
    )

    // Wait for the books to be fetched and rendered
    await waitFor(() => {
      const bookList = screen.getByTestId('book-list')
      expect(bookList).toBeInTheDocument()
    })
  })
})
