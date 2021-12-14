import { act, findByRole, fireEvent, render, RenderResult, waitFor, screen, getByTestId } from '@testing-library/react';
import { createMockClient, MockApolloClient } from 'mock-apollo-client';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ApolloProvider } from '@apollo/client';
import { Login } from '../login';
import userEvent from '@testing-library/user-event';
import { LoginDocument } from '../../generated/graphql';

describe('<Login />', () => {
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;

  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();

      renderResult = render(
        <HelmetProvider>
          <Router>
            <ApolloProvider client={mockedClient}>
              <Login />
            </ApolloProvider>
          </Router>
        </HelmetProvider>
      );
    });
  });

  it('should render OK', async () => {
    await waitFor(() => {
      expect(document.title).toBe('Login | Super Eats');
    });
  });

  // it('displays email validation errors', async () => {
  it('renders the email validation error', async () => {
    const { getByLabelText, debug, getByTestId, getByPlaceholderText, getByRole, container } = renderResult;

    await waitFor(async () => {
      const email = getByPlaceholderText('Email');

      fireEvent.change(email, { target: { value: 'invalid email' } });
      fireEvent.blur(email);
    });
    const errorMessage = screen.getByRole('alert', { name: 'required' });
    expect(errorMessage).toHaveTextContent('Please enter a valid email address');
  });

  it('display password is required errors', async () => {
    const { getByPlaceholderText, getByRole, container, debug } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole('button');

    await act(async () => {
      fireEvent.change(email, { target: { value: 'email@test.com' } });
      fireEvent.click(getByRole('button'));
    });

    const errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/Password is required/i);
  });

  it('submits form and calls mutation', async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole('button');

    const formData = {
      email: 'right@email.com',
      password: '12345',
    };

    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          success: true,
          token: 'XXX',
          message: null,
        },
      },
    });
    mockedClient.setRequestHandler(LoginDocument, mockedMutationResponse);

    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
    });

    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      input: {
        email: formData.email,
        password: formData.password,
      },
    });
  });
  it('submits form and calls mutation and token check', async () => {
    const { getByPlaceholderText, getByRole } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const submitBtn = getByRole('button');

    const formData = {
      email: 'right@email.com',
      password: '12345',
    };

    const mockedMutationResponse = jest.fn().mockResolvedValue({
      data: {
        login: {
          success: true,
          token: 'XXX',
          message: 'mutation-error',
        },
      },
    });
    mockedClient.setRequestHandler(LoginDocument, mockedMutationResponse);
    jest.spyOn(Storage.prototype, 'setItem');

    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(submitBtn);
    });

    expect(mockedMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedMutationResponse).toHaveBeenCalledWith({
      input: {
        email: formData.email,
        password: formData.password,
      },
    });
    const errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/mutation-error/i);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'XXX');
  });
});
