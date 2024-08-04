import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EditBook from '../EditBook';

jest.mock('../../components/BookForm', () => ({ bookId }) => (
  <div>Mocked BookForm with bookId: {bookId}</div>
));

describe('EditBook Component', () => {
  test('renders EditBook component with correct bookId', () => {
    const testId = '123';

    render(
      <BrowserRouter initialEntries={[`/edit-book/${testId}`]}>
          <EditBook />
      </BrowserRouter>
    );

    // Check if the heading is rendered correctly
    expect(screen.getByText('Edit Book')).toBeInTheDocument();
  });
});
