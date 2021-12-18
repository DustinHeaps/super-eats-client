import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { isLoggedInVar } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../constants';
import { useMeQuery } from '../generated/graphql';

export const Header: React.FC = () => {
  const { data } = useMeQuery();
  const history = useHistory();

  const logout = () => {
    history.push('/')
    localStorage.removeItem(LOCALSTORAGE_TOKEN)
    window.location.reload();
    isLoggedInVar(false);

  }

  return (
    <>
      {/* {!data?.me.verified && (
        <div className='bg-red-500 p-3 text-white text-center'>
          <span>Please verify your email</span>
        </div>
      )} */}
      <header className='py-4'>
        <div className='w-full px-5 xl:px-0 max-w-screen-xl  mx-auto flex justify-between items-center'>
          <Link to='/'>
           <p className='text-2xl'>Super <span className='text-lime-600 font-medium'>Eats</span></p> 

          </Link>
          <span className='text-sm flex items-center'>
            <p onClick={logout} className='text-lime-600 hover:underline cursor-pointer pr-4'>Logout</p>
            <Link to='/edit-profile'>
              <FontAwesomeIcon icon={faUser} className='text-lg' />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
