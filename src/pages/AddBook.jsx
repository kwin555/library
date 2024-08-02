import React from 'react';
import BookForm from '../components/BookForm';
import { Heading, Stack } from '@chakra-ui/react';

const AddBook = () => {
  return (
    <Stack>
      <Heading as='h2' size='xl' style={{ marginTop: '8px', marginBottom: '8px' }}>Add a New Book</Heading>
      <BookForm />
    </Stack>
  );
}

export default AddBook;