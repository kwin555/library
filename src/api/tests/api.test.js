import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { getBooks, addBook, deleteBook, updateBook } from '../api'

const API_URL = 'http://localhost:3000/books'

describe('API tests', () => {
  let mock

  beforeAll(() => {
    mock = new MockAdapter(axios)
  })

  afterEach(() => {
    mock.reset()
  })

  afterAll(() => {
    mock.restore()
  })

  it('should fetch books successfully', async () => {
    const books = [
      { id: 1, title: 'Book 1' },
      { id: 2, title: 'Book 2' },
    ]
    mock.onGet(API_URL).reply(200, books)

    try {
      const resp = await getBooks()
      expect(resp).toEqual(books)
    } catch (error) {
      console.log(error)
    }
  })

  it('should handle error while fetching books', async () => {
    mock.onGet(API_URL).reply(500)

    try {
      await getBooks()
    } catch (error) {
      expect(error).toEqual(new Error('Request failed with status code 500'))
    }
  })

  it('should add a book successfully', async () => {
    const newBook = { title: 'New Book' }
    const responseBook = { id: 3, title: 'New Book' }
    mock.onPost(API_URL).reply(200, responseBook)
    try {
      const response = await addBook(newBook)
      expect(response).toEqual(responseBook)
    } catch (e) {
      console.log(e)
    }
  })

  it('should handle error while adding a book', async () => {
    mock.onPost(API_URL).reply(500)

    try {
      await addBook({ title: 'New Book' })
    } catch (error) {
      expect(error).toEqual(new Error('Request failed with status code 500'))
    }
  })

  it('should update a book successfully', async () => {
    const updatedBook = {
      id: 1,
      title: '1984',
      author: 'George Orwell',
      year: '1949',
      genre: 'Dystopian',
    }
    const id = 1
    const responseBook = {
      id: 1,
      title: '1984',
      author: 'George Orwell',
      year: '1949',
      genre: 'Dystopian',
    }
    mock.onPut(`${API_URL}/${id}`).reply(200, responseBook)

    try {
      const response = await updateBook(id, updatedBook)
      expect(response).toEqual(responseBook)
    } catch (e) {
      console.log(e)
    }
  })

  it('should handle error while updating a book', async () => {
    const id = 1
    mock.onPut(`${API_URL}/${id}`).reply(500)

    await expect(updateBook(id, { title: 'Updated Book' })).rejects.toThrow(
      'Request failed with status code 500'
    )
  })

  it('should delete a book successfully', async () => {
    const id = 1
    mock.onDelete(`${API_URL}/${id}`).reply(200)

    try {
      const resp = await deleteBook(id)
      expect(resp).toBe()
    } catch (error) {
      console.log(error)
    }
  })

  it('should handle error while deleting a book', async () => {
    const id = 1
    mock.onDelete(`${API_URL}/${id}`).reply(500)

    try {
      await deleteBook(id)
    } catch (error) {
      expect(error).toEqual(new Error('Request failed with status code 500'))
    }
  })
})
