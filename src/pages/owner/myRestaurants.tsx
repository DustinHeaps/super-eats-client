import { useApolloClient } from '@apollo/client';
import React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Restaurant } from '../../components/Restaurant';
import { MyRestaurantsDocument, useMyRestaurantsQuery } from '../../generated/graphql';

export const MyRestaurants = () => {
  const { data } = useMyRestaurantsQuery();

  return (
    <div>
      <Helmet>
        <title>My Restaurants | Super Eats</title>
      </Helmet>
      <div className='max-w-screen-xl mx-auto mt-8'>
        <div className='flex items-center'>
        <h2 className='text-4xl font-medium'>My Restaurants</h2> 
        {data?.myRestaurants.success && data.myRestaurants.restaurants.length > 0 &&
          <Link className='text-lime-600 hover:underline  pl-4' to='/add-restaurant'>
              Create another restaurant &rarr;
            </Link>
          }
          </div>
        {data?.myRestaurants.success && data.myRestaurants.restaurants.length === 0 ? (
          <>
            <h4 className='text-xl mb-5'>You have no restaurants</h4>
            <Link className='text-lime-600 hover:underline' to='/add-restaurant'>
              Create one &rarr;
            </Link>
          </>
        ) : (
          <div className='grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10'>
            {data?.myRestaurants.restaurants.map((restaurant: any) => (
              <Restaurant
                key={restaurant.id}
                id={restaurant.id + ''}
                image={restaurant.image}
                name={restaurant.name}
                categoryName={restaurant.category?.name}
              />
            ))}
          </div>
        )}
       
      </div>
    </div>
  );
};
