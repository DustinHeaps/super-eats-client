import { useApolloClient } from '@apollo/client';
import { Button } from '../../components/Button';
import { FormError } from '../../components/FormError';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';

import { MyRestaurantsDocument, useCreateRestaurantMutation } from '../../generated/graphql';

interface FormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}

export const AddRestaurant = () => {
  const [create, { data }] = useCreateRestaurantMutation();
  const client = useApolloClient();
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState('');

  const {
    register,

    formState: { errors, isValid, isSubmitting },
    handleSubmit,
  } = useForm<FormProps>({
    mode: 'onChange',
  });
  const [uploading, setUploading] = useState(false);
  const onSubmit = async (data: any) => {
    try {
      setUploading(true);

      const { name, categoryName, address, file } = data;
      const actualFile = data.file[0];
      const formBody = new FormData();
      formBody.append('file', actualFile);

      const fetchURL = process.env.NODE_ENV === 'production' ? 'https://uber-eats-server.herokuapp.com/uploads/' : 'http://localhost:5000/uploads/';
      const { url: image } = await (
        await fetch(fetchURL, {
          method: 'POST',
          body: formBody,
        })
      ).json();

      setImageUrl(image);
      const res = await create({
        variables: {
          input: { name: data.name, address: data.address, categoryName: data.categoryName, image },
        },
      });
      if (res.data?.createRestaurant.success) {
        setUploading(false);
    
        const queryResult = client.readQuery({ query: MyRestaurantsDocument });

        client.writeQuery({
          query: MyRestaurantsDocument,
          data: {
            myRestaurants: {
              ...queryResult.myRestaurants,
              restaurants: [
                {
                  name,
                  address,
                  category: {
                    name: categoryName,
                    __typename: 'Category',
                  },
                  coverImg: imageUrl,
                  id: res.data.createRestaurant.restaurantId,
                  isPromoted: false,
                  __typename: 'Restaurant',
                },
                ...queryResult.myRestaurants.restaurants,
              ],
            },
          },
        });
        history.push('/');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='container flex flex-col items-center mx-auto mt-16'>
      <Helmet>
        <title>Add Restaurant | Super Eats</title>
      </Helmet>
      <h4 className='font-semibold text-2xl mb-3'>Add Restaurant</h4>
      <form onSubmit={handleSubmit(onSubmit)} className='grid max-w-screen-sm gap-3 mt-5 w-full mb-5'>
        <input
          {...register('name', {
            required: 'Name is required',
          })}
          type='text'
          placeholder='Name'
          className='input '
        />
        <input
          {...register('address', {
            required: 'Address is required',
          })}
          type='text'
          placeholder='Address'
          className='input '
        />

        <input
          {...register('categoryName', {
            required: 'Category Name is required',
          })}
          type='text'
          placeholder='Category Name'
          className='input '
        />
        <div>
          <input
            {...register('file', {
              required: true,
            })}
            type='file'
            accept='image/*'
            placeholder='Category Name'
            className='input '
          />
        </div>
        <Button loading={uploading} isValid={isValid} isSubmitting={isSubmitting} actionText='Create Restaurant'></Button>
        {data?.createRestaurant?.message && <FormError errorMessage={data.createRestaurant.message} />}
      </form>
    </div>
  );
};
