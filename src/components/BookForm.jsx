import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookContext } from '../contexts/BookContext';
import { Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';

const BookForm = ({ bookId }) => {
  const navigate = useNavigate();
  const { books, dispatch } = useBookContext();

  const [form, setForm] = useState({
    title: '',
    author: '',
    year: '',
    genre: '',
  });

  useEffect(() => {
    if (bookId) {
      const bookToEdit = books.find(book => book.id === parseInt(bookId));
      if (bookToEdit) {
        setForm(bookToEdit);
      }
    }
  }, [bookId, books]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bookId) {
      dispatch({ type: 'UPDATE_BOOK', payload: { ...form, id: parseInt(bookId) } });
    } else {
      dispatch({ type: 'ADD_BOOK', payload: { ...form, id: Date.now() } });
    }
    navigate('/');
  }

  return (
    <FormControl onSubmit={handleSubmit}>
      <Stack marginInline='12px'>
        <FormLabel>Title</FormLabel>
        <Input type="text" name="title" value={form.title} onChange={handleChange} required />
      </Stack>
      <Stack marginInline='12px'>
        <FormLabel>Author</FormLabel>
        <Input type="text" name="author" value={form.author} onChange={handleChange} required />
      </Stack>
      <Stack marginInline='12px'>
        <FormLabel>Year Published</FormLabel>
        <Input type="number" name="year" value={form.year} onChange={handleChange} required />
      </Stack>
      <Stack marginInline='12px'>
        <FormLabel>Genre</FormLabel>
        <Input type="text" name="genre" value={form.genre} onChange={handleChange} required />
      </Stack>
      <Button onClick={handleSubmit} marginTop='12px'>{bookId ? 'Update' : 'Add'} Book</Button>
    </FormControl>
  );
}

export default BookForm;
