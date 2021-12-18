import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAllRestaurantsQuery, useCategoriesQuery } from '../../generated/graphql';
import { Restaurant } from '../../components/Restaurant';

export const Restaurants = () => {
  const [page, setPage] = useState(1);
  const history = useHistory();

  const { data: categories, loading: catLoading } = useCategoriesQuery();
  const { data } = useAllRestaurantsQuery({ variables: { input: { page: page } } });
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({});

  const onPrevPageClick = () => setPage((current) => current - 1);
  const onNextPageClick = () => setPage((current) => current + 1);
  if (categories) {
    console.log(data);
  }
  const onSearchSubmit = () => {
    const { searchTerm } = getValues();
    history.push({
      pathname: '/search',
      search: `?term=${searchTerm}`,
    });
  };
  return (
    <div>
      <Helmet>
        <title>Home | Super Eats</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className='bg-gray-800 w-full py-40 flex items-center justify-center'
      >
        <input
          {...register('searchTerm', {
            required: true,
            min: 3,
          })}
          type='Search'
          className='input rounded-md border-0 w-3/4 md:w-3/12'
          placeholder='Search restaurants...'
        />
      </form>
      {!catLoading && (
        <div className='max-w-screen-2xl pb-20 mx-auto mt-8'>
          <div className='flex justify-around max-w-sm mx-auto '>
            {categories?.allCategories.categories?.map((category) => (
              <Link to={`/category/${category.slug}`} key={category.id}>
                <div className='flex flex-col group items-center cursor-pointer'>
                  <div
                    className='w-16 h-16 bg-cover group-hover:bg-gray-100 rounded-full'
                    style={{ backgroundImage: `url('${category.image}')` }}
                  ></div>
                  <span className='mt-1 text-sm text-center font-medium'>{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className='grid mx-4 mt-16 md:grid-cols-3 gap-x-5 gap-y-10'>
            {data?.allRestaurants.results?.map((restaurant) => {
              return (
                <Restaurant
                  key={restaurant.id}
                  id={restaurant.id + ''}
                  image={restaurant.image}
                  name={restaurant.name}
                  categoryName={restaurant.category?.name}
                />
              );
            })}
          </div>
          <div className='grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10'>
            {page > 1 ? (
              <button onClick={onPrevPageClick} className='focus:outline-none font-medium text-2xl'>
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span>
              Page {page} of {data?.allRestaurants.totalPages}
            </span>
            {page !== data?.allRestaurants.totalPages ? (
              <button onClick={onNextPageClick} className='focus:outline-none font-medium text-2xl'>
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
