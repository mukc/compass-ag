import React from 'react';
import { render, getByPlaceholderText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from 'src/app/App';

describe('App component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('should find input and search button', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const inputElement = getByPlaceholderText('Enter Ingredient Name');
    const searchButton = getByText('Search');

    expect(inputElement).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('if we have no input, search button should be disabled', () => {
    const { getByText } = render(<App />);
    const searchButton = getByText('Search');

    expect(searchButton).toBeDisabled();
  });
});
