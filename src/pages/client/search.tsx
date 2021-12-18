import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useLocation } from 'react-router-dom';
import { Restaurant } from '../../components/Restaurant';
import { useSearchRestaurantsQuery } from '../../generated/graphql';

export const Search = () => {
  const [query, setQuery] = useState('');
  const location = useLocation();
  const history = useHistory();
  const { data } = useSearchRestaurantsQuery({ variables: { input: { query: query } } });

  useEffect(() => {
    const [_, query] = location.search.split('?term=');
    if (!query) {
      return history.replace('/');
    }
    setQuery(query);

  }, [history, location]);
  return (
    <>
      <h1>
        <Helmet>
          <title>Search | Super Eats</title>
        </Helmet>
      </h1>

      <div className='grid mx-4 mt-16 md:grid-cols-3 gap-x-5 gap-y-5'>
        {data?.searchRestaurants.restaurants?.map((restaurant) => {
          return (
            <Restaurant key={restaurant.id} id={restaurant.id + ''} image={restaurant.image} name={restaurant.name} />
          );
        })}
      </div>
    </>
  );
};
