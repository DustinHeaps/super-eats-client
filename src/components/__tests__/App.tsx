import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { isLoggedInVar } from '../../apollo';
import { App } from '../App';

jest.mock('../../routers/loggedOutRouter.tsx', () => {
  return {
    LoggedOutRouter: () => <span>logged-out</span>,
  };
});
jest.mock('../../routers/loggedInRouter.tsx', () => {
  return {
    LoggedInRouter: () => <span>logged-in</span>,
  };
});

describe('<App />', () => {
  it('renders OK', () => {
    render(<App />);
  });
  it('renders LoggdOutRouter', () => {
    const { getByText } = render(<App />);
    getByText('logged-out');
  });
  
  it('renders LoggdInRouter', async () => {
    const { getByText } = render(<App />);
    await waitFor(() => {
      isLoggedInVar(true);
    });
    getByText('logged-in');
  });
});
