import React from 'react';
import { Button } from '../../components/Button';
import { useEditProfileMutation, useMeQuery } from '../../generated/graphql';
import { useForm } from 'react-hook-form';
import { gql, useApolloClient } from '@apollo/client';
import { Helmet } from 'react-helmet-async';

interface Props {
  email?: string;
  password?: string;
}

export const EditProfile: React.FC<Props> = ({ email, password }) => {
  const { data } = useMeQuery();
  const [edit, { loading }] = useEditProfileMutation();
  const client = useApolloClient();
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<Props>({
    defaultValues: {
      email: data?.me.email,
    },
    mode: 'onChange',
  });
  const onSubmit = async (formData: Props) => {
    console.log(formData);
    const { password } = formData;
    const res = await edit({
      variables: {
        input: {
          email: formData.email,
          // ...(password !== '' &&  { password }),
        },
      },
    });
    console.log(res);
    if (res.data?.editProfile.success && data) {
      const prevEmail = data.me.email;
      const newEmail = formData.email;

      if (prevEmail !== newEmail) {
        client.writeFragment({
          //"User:id" to match apollo cache id
          id: `User:${data.me.id}`,
          fragment: gql`
            fragment updatedUser on User {
              verified
              email
            }
          `,
          data: {
            verified: false,
            email: newEmail,
          },
        });
      }
    }
  };
  return (
    <div className='mt-52 flex flex-col items-center justify-center'>
      <Helmet>
        <title>Edit Profile | Super Eats</title>
      </Helmet>
      <h4>Edit Profile</h4>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col max-w-screen-sm my-5 w-full mb-5'>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern:
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          name='email'
          className='input'
          type='email'
          placeholder='Email'
        />
        <input {...register('password')} name='password' className='input' type='password' placeholder='Password' />
        <Button loading={loading} isValid={isValid} isSubmitting={isSubmitting} actionText={'Update Profile'} />
      </form>
    </div>
  );
};
