import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useMeQuery } from '../generated/graphql';
import logo from '../images/logo.svg';

export const Header: React.FC = () => {
  const { data } = useMeQuery();
  return (
    <>
      {!data?.me.verified && (
        <div className='bg-red-500 p-3 text-white text-center'>
          <span>Please verify your email</span>
        </div>
      )}
      <header className='py-4'>
        <div className='w-full px-5 xl:px-0 max-w-screen-xl  mx-auto flex justify-between items-center'>
          <Link to='/'>
           <p className='text-2xl'>Super <span className='text-lime-600 font-medium'>Eats</span></p> 

          </Link>
          <span className='text-xs'>
            <Link to='/edit-profile'>
              <FontAwesomeIcon icon={faUser} className='text-lg' />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
