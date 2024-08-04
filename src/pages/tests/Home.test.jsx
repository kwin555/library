import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';

jest.mock('../../components/BookList', () => () => <div>Mocked BookList</div>);

describe('Home Component', () => {
  test('renders Home component with BookList and Add New Book button', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Check if the BookList component is rendered
    expect(screen.getByText('Mocked BookList')).toBeInTheDocument();

    // Check if the Add New Book button is rendered
    const addButton = screen.getByText('Add New Book');
    expect(addButton).toBeInTheDocument();
  });

  test('navigates to /add-book when Add New Book button is clicked', () => {
     render(
      <BrowserRouter initialEntries={['/']}>
        <Home />
      </BrowserRouter>
    );

    const addButton = screen.getByTestId('home-add-button');
    fireEvent.click(addButton);
  });
});
