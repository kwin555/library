import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import { BookProvider } from '../../contexts/BookContext'
import BookForm from '../BookForm'
import { ChakraProvider } from '@chakra-ui/react'
import { ErrorProvider } from '../../contexts/ErrorContext'

jest.mock('axios')

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}))

const renderBookForm = (bookId = null) => {
  return render(
    <ChakraProvider>
      <Router>
        <ErrorProvider>
          <BookProvider>
            <BookForm bookId={bookId} />
          </BookProvider>
        </ErrorProvider>
      </Router>
    </ChakraProvider>
  )
}

describe('BookForm', () => {
  let mockDispatch

  beforeEach(() => {
    mockDispatch = jest.fn()

    jest
      .spyOn(require('../../contexts/BookContext'), 'useBookContext')
      .mockReturnValue({
        books: [
          {
            id: 1,
            title: 'Sample Book',
            author: 'John Doe',
            year: '2021',
            genre: 'Fiction',
          },
        ],
        dispatch: mockDispatch,
      })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('renders form with empty fields for new book', async () => {
    const books = [
      {
        id: 1,
        title: '1984',
        author: 'George Orwell',
        year: '1949',
        genre: 'Dystopian',
      },
      {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        year: '1960',
        genre: 'Fiction',
      },
    ]

    axios.get.mockResolvedValueOnce({ data: books })
    renderBookForm()

    expect(screen.getByTestId('input-title')).toHaveValue('')
    expect(screen.getByTestId('input-author')).toHaveValue('')
    expect(screen.getByTestId('input-year')).toHaveValue(null)
    expect(screen.getByTestId('input-genre')).toHaveValue('')
  })

  test('renders form with pre-filled fields for editing book', async () => {
    const books = [
      {
        id: 1,
        title: '1984',
        author: 'George Orwell',
        year: '1949',
        genre: 'Dystopian',
      },
      {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        year: '1960',
        genre: 'Fiction',
      },
    ]

    axios.get.mockResolvedValueOnce({ data: books })
    renderBookForm(1)

    expect(screen.getByTestId('input-title')).toHaveValue('Sample Book')
    expect(screen.getByTestId('input-author')).toHaveValue('John Doe')
    expect(screen.getByTestId('input-year')).toHaveValue(2021)
    expect(screen.getByTestId('input-genre')).toHaveValue('Fiction')
  })

  test('displays error messages for required fields', async () => {
    const books = [
      {
        id: 1,
        title: '1984',
        author: 'George Orwell',
        year: '1949',
        genre: 'Dystopian',
      },
      {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        year: '1960',
        genre: 'Fiction',
      },
    ]

    axios.get.mockResolvedValueOnce({ data: books })
    renderBookForm()

    fireEvent.click(screen.getByTestId('submit-button'))

    await waitFor(() => {
      expect(screen.getByTestId('error-title')).toHaveTextContent(
        'Title is required'
      )
      expect(screen.getByTestId('error-author')).toHaveTextContent(
        'Author is required'
      )
      expect(screen.getByTestId('error-year')).toHaveTextContent(
        'Year Published is required'
      )
      expect(screen.getByTestId('error-genre')).toHaveTextContent(
        'Genre is required'
      )
    })
  })

  test('renders form with empty fields when bookId does not exist', () => {
    const books = [
      {
        id: 1,
        title: '1984',
        author: 'George Orwell',
        year: '1949',
        genre: 'Dystopian',
      },
      {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        year: '1960',
        genre: 'Fiction',
      },
    ]

    axios.get.mockResolvedValueOnce({ data: books })
    renderBookForm(2)

    expect(screen.getByTestId('input-title')).toHaveValue('')
    expect(screen.getByTestId('input-author')).toHaveValue('')
    expect(screen.getByTestId('input-year')).toHaveValue(null)
    expect(screen.getByTestId('input-genre')).toHaveValue('')
  })

  test('dispatches ADD_BOOK action for new book', async () => {
    const books = [
      {
        id: 1,
        title: '1984',
        author: 'George Orwell',
        year: '1949',
        genre: 'Dystopian',
      },
      {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        year: '1960',
        genre: 'Fiction',
      },
    ]

    axios.get.mockResolvedValueOnce({ data: books })
    axios.post.mockResolvedValueOnce({
      id: expect.any(Number),
      title: 'New Book',
      author: 'Jane Doe',
      year: 2022,
      genre: 'Science',
    })
    renderBookForm()

    fireEvent.change(screen.getByTestId('input-title'), {
      target: { value: 'New Book' },
    })
    fireEvent.change(screen.getByTestId('input-author'), {
      target: { value: 'Jane Doe' },
    })
    fireEvent.change(screen.getByTestId('input-year'), {
      target: { value: 2022 },
    })
    fireEvent.change(screen.getByTestId('input-genre'), {
      target: { value: 'Science' },
    })

    fireEvent.click(screen.getByTestId('submit-button'))

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'ADD_BOOK',
        payload: {
          id: expect.any(Number),
          title: 'New Book',
          author: 'Jane Doe',
          year: 2022,
          genre: 'Science',
        },
      })
    })
  })

  test('dispatches UPDATE_BOOK action for existing book', async () => {
    const books = [
      {
        id: 1,
        title: '1984',
        author: 'George Orwell',
        year: '1949',
        genre: 'Dystopian',
      },
      {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        year: '1960',
        genre: 'Fiction',
      },
    ]

    axios.get.mockResolvedValueOnce({ data: books })
    axios.put.mockResolvedValueOnce({})
    renderBookForm(1)

    fireEvent.change(screen.getByTestId('input-title'), {
      target: { value: 'Updated Book' },
    })
    fireEvent.change(screen.getByTestId('input-author'), {
      target: { value: 'John Smith' },
    })
    fireEvent.change(screen.getByTestId('input-year'), {
      target: { value: 2023 },
    })
    fireEvent.change(screen.getByTestId('input-genre'), {
      target: { value: 'History' },
    })

    fireEvent.click(screen.getByTestId('submit-button'))

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'UPDATE_BOOK',
        payload: {
          id: 1,
          title: 'Updated Book',
          author: 'John Smith',
          year: 2023,
          genre: 'History',
        },
      })
    })
  })
})
