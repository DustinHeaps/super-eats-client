import React from 'react';

interface Props {
  errorMessage: string;
}

export const FormError: React.FC<Props> = ({ errorMessage }) => {
  if (errorMessage === 'Please enter valid email address') {
    return (
      <span role='alert' className='absolute left-1/3 bottom-2 font-medium text-red-500'>
        {errorMessage}
      </span>
    );
  } else
    return (
      <span aria-label='required' role='alert' className='font-medium text-red-500'>
        {errorMessage}
      </span>
    );
};
