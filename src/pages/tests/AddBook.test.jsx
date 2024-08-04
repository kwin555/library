import React from 'react';
import { render, screen } from '@testing-library/react';
import AddBook from '../AddBook';

jest.mock('../../components/BookForm', () => () => <div>Mocked BookForm</div>);

describe('AddBook Component', () => {
  test('renders AddBook component with heading and BookForm', () => {
    render(<AddBook />);

    // Check if the heading is rendered correctly
    expect(screen.getByText('Add a New Book')).toBeInTheDocument();

    // Check if the BookForm is rendered
    expect(screen.getByText('Mocked BookForm')).toBeInTheDocument();
  });
});
