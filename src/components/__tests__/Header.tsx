import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MeDocument } from '../../generated/graphql';
import { Header } from '../Header';

describe('<Header />', () => {
  it('renders verify banner', async () => {
    await waitFor(async () => {
      const { getByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: MeDocument,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: '',
                    role: '',
                    verified: false,
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );
      // wait for response - from apollo docs
      await new Promise((resolve) => setTimeout(resolve, 0));
      getByText('Please verify your email');
    });
  });

  it('renders without verify banner', async () => {
    await waitFor(async () => {
      const { queryByText } = render(
        <MockedProvider
          mocks={[
            {
              request: {
                query: MeDocument,
              },
              result: {
                data: {
                  me: {
                    id: 1,
                    email: '',
                    role: '',
                    verified: true,
                  },
                },
              },
            },
          ]}
        >
          <Router>
            <Header />
          </Router>
        </MockedProvider>
      );
      // wait for response - from apollo docs
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(queryByText('Please verify your email')).toBeNull;
    });
  });
});
