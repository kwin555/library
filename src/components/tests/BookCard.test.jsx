import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'

import BookCard from '../BookCard'
import { BookProvider } from '../../contexts/BookContext'
import { ChakraProvider } from '@chakra-ui/react'
import { ErrorProvider } from '../../contexts/ErrorContext'

jest.mock('axios')

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

const book = {
  id: 1,
  title: 'Sample Book',
  author: 'John Doe',
  year: 2021,
  genre: 'Fiction',
}

const renderBookCard = () => {
  return render(
    <ChakraProvider>
      <Router>
        <ErrorProvider>
          <BookProvider>
            <BookCard book={book} />
          </BookProvider>
        </ErrorProvider>
      </Router>
    </ChakraProvider>
  )
}

describe('BookCard', () => {
  let mockDispatch
  let mockNavigate

  beforeEach(() => {
    mockDispatch = jest.fn()
    mockNavigate = jest.fn()

    jest
      .spyOn(require('../../contexts/BookContext'), 'useBookContext')
      .mockReturnValue({ dispatch: mockDispatch })

    jest
      .spyOn(require('react-router-dom'), 'useNavigate')
      .mockReturnValue(mockNavigate)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('renders BookCard with book details', async () => {
    await waitFor(() => {
      renderBookCard()
    })

    expect(screen.getByTestId(`book-title-${book.id}`)).toHaveTextContent(
      book.title
    )
    expect(screen.getByTestId(`book-author-${book.id}`)).toHaveTextContent(
      `Author: ${book.author}`
    )
    expect(screen.getByTestId(`book-year-${book.id}`)).toHaveTextContent(
      `Year: ${book.year}`
    )
    expect(screen.getByTestId(`book-genre-${book.id}`)).toHaveTextContent(
      `Genre: ${book.genre}`
    )
  })

  test('opens and closes the delete modal', async () => {
    axios.delete.mockResolvedValueOnce({})

    act(() => {
      renderBookCard()
    })

    const deleteButton = screen.getByTestId(`delete-button-${book.id}`)
    fireEvent.click(deleteButton)

    expect(screen.getByTestId(`delete-modal-${book.id}`)).toBeInTheDocument()

    const closeButton = screen.getByTestId('modal-primary-action')
    await act(async () => {
      fireEvent.click(closeButton)
    })

    expect(
      screen.queryByTestId(`delete-modal-${book.id}`)
    ).not.toBeInTheDocument()
  })

  test('calls dispatch with DELETE_BOOK action', async () => {
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
    axios.delete.mockResolvedValueOnce({})
    act(() => {
      renderBookCard()
    })

    const deleteButton = screen.getByTestId(`delete-button-${book.id}`)
    fireEvent.click(deleteButton)

    expect(screen.getByTestId(`delete-modal-${book.id}`)).toBeInTheDocument()

    const deleteActionButton = screen.getByTestId('modal-primary-action')
    fireEvent.click(deleteActionButton)

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        `http://localhost:3000/books/${book.id}`
      )
    })

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'DELETE_BOOK',
      payload: book.id,
    })
  })

  test('navigates to edit book page when Edit button is clicked', () => {
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
    renderBookCard()

    const editButton = screen.getByTestId(`edit-button-${book.id}`)
    fireEvent.click(editButton)

    expect(mockNavigate).toHaveBeenCalledWith(`/edit-book/${book.id}`)
  })
})
