import React from 'react';

interface Props {
  isValid: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<Props> = ({ isValid, loading, actionText }) => {
  return (
    <button
     
      role="button"
      className={` text-white py-3 transition-colors text-lg font-medium ${
        isValid ? 'bg-lime-600 hover:bg-lime-700' : 'bg-gray-300 pointer-events-none'
      }`}
    >
      {loading ? 'Loading...' : actionText}
    </button>
  );
};
