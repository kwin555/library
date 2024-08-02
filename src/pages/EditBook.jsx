import React from 'react';
import { useParams } from 'react-router-dom';
import BookForm from '../components/BookForm';
import { Heading, Stack } from '@chakra-ui/react';

const EditBook = () => {
  const { id } = useParams();
  return (
    <Stack>
      <Heading as='h1' size='xl'>Edit Book</Heading>
      <BookForm bookId={id} />
    </Stack>
  );
}

export default EditBook;