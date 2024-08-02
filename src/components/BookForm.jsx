import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookContext } from '../contexts/BookContext';
import { useForm } from 'react-hook-form';
import { Button, FormControl, FormLabel, Input, Stack, FormErrorMessage, FormHelperText } from '@chakra-ui/react';

const BookForm = ({ bookId }) => {
  const navigate = useNavigate();
  const { books, dispatch } = useBookContext();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (bookId) {
      const bookToEdit = books.find(book => book.id === parseInt(bookId));
      if (bookToEdit) {
        setValue('title', bookToEdit.title);
        setValue('author', bookToEdit.author);
        setValue('year', bookToEdit.year);
        setValue('genre', bookToEdit.genre);
      }
    }
  }, [bookId, books, setValue]);

  const onSubmit = (data) => {
    if (bookId) {
      dispatch({ type: 'UPDATE_BOOK', payload: { ...data, id: parseInt(bookId) } });
    } else {
      dispatch({ type: 'ADD_BOOK', payload: { ...data, id: Date.now() } });
    }
    navigate('/');
  };

  return (
    <FormControl as="form" onSubmit={handleSubmit(onSubmit)} isInvalid={Object.values(errors).some(err => err.message.length > 0)}>
      <Stack marginInline="12px">
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          {...register('title', { required: 'Title is required' })}
          isInvalid={!!errors.title}
        />
        {errors.title ? (
          <FormErrorMessage>{errors.title.message}</FormErrorMessage>
        ) : (
          <FormHelperText style={{ display: 'flex', justifyContent: 'start', marginBottom: '12px' }}>
            Enter the title for your book.
          </FormHelperText>
        )}
      </Stack>
      <Stack marginInline="12px">
        <FormLabel>Author</FormLabel>
        <Input
          type="text"
          {...register('author', { required: 'Author is required' })}
          isInvalid={!!errors.author}
        />
        {errors.author ? (
          <FormErrorMessage>{errors.author.message}</FormErrorMessage>
        ) : (
          <FormHelperText style={{ display: 'flex', justifyContent: 'start', marginBottom: '12px' }}>
            Enter the author for your book.
          </FormHelperText>
        )}
      </Stack>
      <Stack marginInline="12px">
        <FormLabel>Year Published</FormLabel>
        <Input
          type="number"
          {...register('year', { required: 'Year Published is required' })}
          isInvalid={!!errors.year}
        />
        {errors.year ? (
          <FormErrorMessage>{errors.year.message}</FormErrorMessage>
        ) : (
          <FormHelperText style={{ display: 'flex', justifyContent: 'start', marginBottom: '12px' }}>
            Enter the year for your book.
          </FormHelperText>
        )}
      </Stack>
      <Stack marginInline="12px">
        <FormLabel>Genre</FormLabel>
        <Input
          type="text"
          {...register('genre', { required: 'Genre is required' })}
          isInvalid={!!errors.genre}
        />
        {errors.genre ? (
          <FormErrorMessage>{errors.genre.message}</FormErrorMessage>
        ) : (
          <FormHelperText style={{ display: 'flex', justifyContent: 'start', marginBottom: '12px' }}>
            Enter the genre for your book.
          </FormHelperText>
        )}
      </Stack>
      <Button marginTop="12px" type="submit" isLoading={isSubmitting}>
        {bookId ? 'Update' : 'Add'} Book
      </Button>
    </FormControl>
  );
};

export default BookForm;
