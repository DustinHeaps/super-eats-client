import { ApolloProvider } from '@apollo/client';
import { fireEvent, getByLabelText, render, RenderResult, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockApolloClient, createMockClient } from 'mock-apollo-client';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Register } from '../register';
import { BrowserRouter as Router } from 'react-router-dom';
import { RegisterDocument, UserRole } from '../../generated/graphql';

const mockPush = jest.fn();

jest.mock('react-router-dom', () => {
  const realModule = jest.requireActual('react-router-dom');
  return {
    ...realModule,
    useHistory: () => {
      return {
        push: mockPush,
      };
    },
  };
});

describe('<Register />', () => {
  let mockedClient: MockApolloClient;
  let renderResult: RenderResult;

  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <HelmetProvider>
          <Router>
            <ApolloProvider client={mockedClient}>
              <Register />
            </ApolloProvider>
          </Router>
        </HelmetProvider>
      );
    });
  });

  it('renders OK ', async () => {
    await waitFor(() => {
      expect(document.title).toBe('Register | Super Eats');
    });
  });

  it('renders validation errors ', async () => {
    const { getByRole, getByPlaceholderText, getByLabelText } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const button = getByRole('button');

    await waitFor(() => {
      fireEvent.change(email, { target: { value: 'invalid email' } });
      fireEvent.blur(email);
    });

    let errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/please enter valid email address/i);
    await waitFor(() => {
      fireEvent.change(email, { target: { value: '' } });
      fireEvent.blur(email);
    });
    errorMessage = getByLabelText('required');
    expect(errorMessage).toHaveTextContent(/email is required/i);
    await waitFor(() => {
      userEvent.type(email, 'right@gmail.com');
      userEvent.click(button);
    });
    errorMessage = getByRole('alert');
    expect(errorMessage).toHaveTextContent(/password is required/i);
  });
  it('submits mutation with form values', async () => {
    const { getByRole, getByPlaceholderText } = renderResult;
    const email = getByPlaceholderText(/email/i);
    const password = getByPlaceholderText(/password/i);
    const button = getByRole('button');

    const formData = {
      email: 'right@gmail.com',
      password: '1234567',
      role: UserRole.Client,
    };

    const mockedLoginMutationResponse = jest.fn().mockResolvedValue({
      data: {
        register: {
          success: true,
          message: 'mutation-error',
        },
      },
    });

    mockedClient.setRequestHandler(RegisterDocument, mockedLoginMutationResponse);

    jest.spyOn(window, 'alert').mockImplementation(() => null);

    await waitFor(() => {
      userEvent.type(email, formData.email);
      userEvent.type(password, formData.password);
      userEvent.click(button);
    });

    expect(mockedLoginMutationResponse).toHaveBeenCalledTimes(1);
    expect(mockedLoginMutationResponse).toHaveBeenCalledWith({
      input: {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      },
    });
  });
});
