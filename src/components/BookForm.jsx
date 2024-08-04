import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBookContext } from '../contexts/BookContext'
import { useForm } from 'react-hook-form'
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import { addBook, updateBook } from '../api/api'

const BookForm = ({ bookId }) => {
  const navigate = useNavigate()
  const { books, dispatch } = useBookContext()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm()

  useEffect(() => {
    if (bookId) {
      const bookToEdit = books.find((book) => book.id === parseInt(bookId))
      if (bookToEdit) {
        setValue('title', bookToEdit.title)
        setValue('author', bookToEdit.author)
        setValue('year', bookToEdit.year)
        setValue('genre', bookToEdit.genre)
      }
    }
  }, [bookId, books, setValue])

  const onSubmit = async (data) => {
    const bookData = { ...data, year: parseInt(data.year, 10) }
    if (bookId) {
      try {
        dispatch({
          type: 'UPDATE_BOOK',
          payload: { ...bookData, id: parseInt(bookId) },
        })
        await updateBook(bookId, { ...bookData, id: parseInt(bookId) })
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        dispatch({ type: 'ADD_BOOK', payload: { ...bookData, id: Date.now() } })
        await addBook({ ...bookData, id: Date.now() })
      } catch (e) {
        console.log(e)
      }
    }
    navigate('/')
  }

  return (
    <FormControl
      as='form'
      onSubmit={handleSubmit(onSubmit)}
      isInvalid={Object.values(errors).some((err) => err.message.length > 0)}
      data-testid='book-form'
    >
      <Stack marginInline='12px'>
        <FormLabel>Title</FormLabel>
        <Input
          type='text'
          {...register('title', { required: 'Title is required' })}
          isInvalid={!!errors.title}
          data-testid='input-title'
        />
        {errors.title ? (
          <FormErrorMessage data-testid='error-title'>
            {errors.title.message}
          </FormErrorMessage>
        ) : (
          <FormHelperText
            style={{
              display: 'flex',
              justifyContent: 'start',
              marginBottom: '12px',
            }}
          >
            Enter the title for your book.
          </FormHelperText>
        )}
      </Stack>
      <Stack marginInline='12px'>
        <FormLabel>Author</FormLabel>
        <Input
          type='text'
          {...register('author', { required: 'Author is required' })}
          isInvalid={!!errors.author}
          data-testid='input-author'
        />
        {errors.author ? (
          <FormErrorMessage data-testid='error-author'>
            {errors.author.message}
          </FormErrorMessage>
        ) : (
          <FormHelperText
            style={{
              display: 'flex',
              justifyContent: 'start',
              marginBottom: '12px',
            }}
          >
            Enter the author for your book.
          </FormHelperText>
        )}
      </Stack>
      <Stack marginInline='12px'>
        <FormLabel>Year Published</FormLabel>
        <Input
          type='number'
          {...register('year', { required: 'Year Published is required' })}
          isInvalid={!!errors.year}
          data-testid='input-year'
        />
        {errors.year ? (
          <FormErrorMessage data-testid='error-year'>
            {errors.year.message}
          </FormErrorMessage>
        ) : (
          <FormHelperText
            style={{
              display: 'flex',
              justifyContent: 'start',
              marginBottom: '12px',
            }}
          >
            Enter the year for your book.
          </FormHelperText>
        )}
      </Stack>
      <Stack marginInline='12px'>
        <FormLabel>Genre</FormLabel>
        <Input
          type='text'
          {...register('genre', { required: 'Genre is required' })}
          isInvalid={!!errors.genre}
          data-testid='input-genre'
        />
        {errors.genre ? (
          <FormErrorMessage data-testid='error-genre'>
            {errors.genre.message}
          </FormErrorMessage>
        ) : (
          <FormHelperText
            style={{
              display: 'flex',
              justifyContent: 'start',
              marginBottom: '12px',
            }}
          >
            Enter the genre for your book.
          </FormHelperText>
        )}
      </Stack>
      <Button
        marginTop='12px'
        type='submit'
        isLoading={isSubmitting}
        data-testid='submit-button'
      >
        {bookId ? 'Update' : 'Add'} Book
      </Button>
    </FormControl>
  )
}

export default BookForm
