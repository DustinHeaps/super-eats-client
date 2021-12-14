import { gql, useApolloClient } from '@apollo/client';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { useMeQuery, useVerifyEmailMutation } from '../../generated/graphql';

export const ConfirmEmail = () => {
  const [verifyEmail, loading] = useVerifyEmailMutation();
  const client = useApolloClient();
  const { data } = useMeQuery();
  const history = useHistory();

  useEffect(() => {
    const fetch = async () => {
      const [, code] = window.location.href.split('code=');

      const res = await verifyEmail({
        variables: {
          input: {
            code,
          },
        },
      });

      if (res.data?.verifyEmail.success && data?.me.id) {
        client.writeFragment({
          //"User:id" to match apollo cache id
          id: `User:${data.me.id}`,
          fragment: gql`
            fragment verified on User {
              verified
            }
          `,
          data: {
            verified: true,
          },
        });

        history.push('/');
      }
    };

    fetch();
  }, []);
  return (
    <div className='mt-52 flex flex-col items-center justify-center'>
      <Helmet>
        <title>Confirm Email | Super Eats</title>
      </Helmet>
      <h2 className='text-lg mb-1 font-medium '>Confirming Email...</h2>
      <h4 className='text-gray-700 text-sm'>Please wait don't close this page</h4>
    </div>
  );
};
