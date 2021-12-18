import React from 'react';
import { useParams } from 'react-router-dom';
import { Restaurant } from '../../components/Restaurant';
import { useGetCategoryQuery } from '../../generated/graphql';

interface CategoryParams {
  slug: string;
}

export const Category = () => {
  const params = useParams<CategoryParams>();
    const {data} = useGetCategoryQuery({variables: {input: {slug: params.slug, page: 1}}

    })

    return (
      
      <div className='grid mx-4 mt-16 md:grid-cols-3 gap-x-5 gap-y-5'>
      {data?.category.category?.restaurants.map((restaurant) => {
        
        return (
        <Restaurant
          key={restaurant.id}
          id={restaurant.id + ''}
          image={restaurant.image}
          name={restaurant.name}
        />
        )
        })}
    </div>
      
      )
  }
  
