const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors())

app.use(bodyParser.json());

let books = [
  { id: 1, title: '1984', author: 'George Orwell', year: '1949', genre: 'Dystopian' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: '1960', genre: 'Fiction' },
];

// Middleware for error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});

// GET /books - Retrieves all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST /books - Adds a new book
app.post('/books', (req, res) => {
  try {
    const newBook = {
      id: books.length ? books[books.length - 1].id + 1 : 1,
      ...req.body,
    };
    books.push(newBook);
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
});

// PUT /books/:id - Updates an existing book
app.put('/books/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const index = books.findIndex((book) => book.id === parseInt(id, 10));
    if (index !== -1) {
      books[index] = { id: parseInt(id, 10), ...req.body };
      res.json(books[index]);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /books/:id - Deletes a book
app.delete('/books/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const index = books.findIndex((book) => book.id === parseInt(id, 10));
    if (index !== -1) {
      books.splice(index, 1);
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Library API is running on http://localhost:${port}`);
});
