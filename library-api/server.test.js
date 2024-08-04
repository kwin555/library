const request = require('supertest')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

let books = [
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

app.get('/books', (req, res) => {
  res.json(books)
})

app.post('/books', (req, res) => {
  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    ...req.body,
  }
  books.push(newBook)
  res.status(201).json(newBook)
})

app.put('/books/:id', (req, res) => {
  const { id } = req.params
  const index = books.findIndex((book) => book.id === parseInt(id, 10))
  if (index !== -1) {
    books[index] = { id: parseInt(id, 10), ...req.body }
    res.json(books[index])
  } else {
    res.status(404).json({ message: 'Book not found' })
  }
})

app.delete('/books/:id', (req, res) => {
  const { id } = req.params
  const index = books.findIndex((book) => book.id === parseInt(id, 10))
  if (index !== -1) {
    books.splice(index, 1)
    res.status(204).end()
  } else {
    res.status(404).json({ message: 'Book not found' })
  }
})

describe('Library API', () => {
  test('GET /books should return all books', async () => {
    const response = await request(app).get('/books')
    expect(response.status).toBe(200)
    expect(response.body).toEqual(books)
  })

  test('POST /books should add a new book', async () => {
    const newBook = {
      title: 'New Book',
      author: 'New Author',
      year: '2022',
      genre: 'Science Fiction',
    }
    const response = await request(app).post('/books').send(newBook)
    expect(response.status).toBe(201)
    expect(response.body).toMatchObject(newBook)
    expect(response.body.id).toBeDefined()
  })

  test('PUT /books/:id should update an existing book', async () => {
    const updatedBook = {
      title: '1984 Updated',
      author: 'George Orwell',
      year: '1949',
      genre: 'Dystopian',
    }
    const response = await request(app).put('/books/1').send(updatedBook)
    expect(response.status).toBe(200)
    expect(response.body).toMatchObject(updatedBook)
  })

  test('DELETE /books/:id should delete a book', async () => {
    const response = await request(app).delete('/books/1')
    expect(response.status).toBe(204)
    const getResponse = await request(app).get('/books')
    expect(getResponse.body.find((book) => book.id === 1)).toBeUndefined()
  })
})
