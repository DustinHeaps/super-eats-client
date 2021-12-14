import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useFieldArray, useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { client } from '../../apollo';
import { Button } from '../../components/Button';
import { MyRestaurantDocument, useCreateDishMutation } from '../../generated/graphql';

interface Params {
  restaurantId: string;
}

interface FormProps {
  name: string;
  price: string;
  description: string;
  [key: string]: string;
}

export const AddDish = () => {
  const { restaurantId } = useParams<Params>();
  const history = useHistory();
  const [createDish, { loading }] = useCreateDishMutation();
  // const [createDishMutation, { loading }] = useMutation<
  //   createDish,
  //   createDishVariables
  // >(CREATE_DISH_MUTATION, {
  //   refetchQueries: [
  //     {
  //       query: MY_RESTAURANT_QUERY,
  //       variables: {
  //         input: {
  //           id: +restaurantId,
  //         },
  //       },
  //     },
  //   ],
  // });
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    control,
  } = useForm<FormProps>({ mode: 'onChange' });

  const onSubmit = async (data: any) => {
    const { name, price, description, ...rest } = getValues();
    const optionObjects = options.map((theId) => ({
      name: rest[`${theId}-optionName`],
      extra: +rest[`${theId}-optionExtra`],
    }));

    const actualFile = data.file[0];
    const formBody = new FormData();
    formBody.append('file', actualFile);

    const { url: photo } = await (
      await fetch('http://localhost:5000/uploads/', {
        method: 'POST',
        body: formBody,
      })
    ).json();

    const res = await createDish({
      variables: {
        input: {
          name: data.name,
          price: +data.price,
          photo: photo,
          description: data.description,
          restaurantId: +restaurantId,
          options: optionObjects,
        },
      },
    });
    if (res.data?.createDish.success) {
      await client.refetchQueries({
        include: [MyRestaurantDocument],
      });
    }

    history.goBack();
  };

  const [options, setOptions] = useState<number[]>([]);
  const onAddOptionClick = () => {
    setOptions((current) => [Date.now(), ...current]);
  };
  const onDeleteClick = (idToDelete: number) => {
    setOptions((current) => current.filter((id) => id !== idToDelete));
    setValue(`${idToDelete}-optionName` as any, '');
    setValue(`${idToDelete}-optionExtra` as any, '');
  };

  return (
    <div className='container flex flex-col items-center mt-52'>
      <Helmet>
        <title>Add Dish | Super Eats</title>
      </Helmet>
      <h4 className='font-semibold text-2xl mb-3'>Add Dish</h4>
      <form onSubmit={handleSubmit(onSubmit)} className='grid max-w-screen-sm gap-3 mt-5 w-full mb-5'>
        <input
          {...register('name', {
            required: 'Name is required',
          })}
          type='text'
          placeholder='Name'
          className='input'
        />
        <input
          {...register('price', {
            required: 'Price is required',
          })}
          min={0}
          type='number'
          placeholder='Price'
          className='input'
        />
        <input
          {...register('description', {
            required: 'Description Name is required',
          })}
          type='text'
          placeholder='Description'
          className='input'
        />
        <input
          {...register('file', {
            required: true,
          })}
          type='file'
          accept='image/*'
          placeholder='Category Name'
          className='input '
        />
        <div className='my-10'>
          <h4 className='font-medium mb-3 text-lg'>Dish Options</h4>
          <span onClick={onAddOptionClick} className='cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5 '>
            Add Dish Option
          </span>
          {options.length !== 0 &&
            options.map((id) => (
              <div key={id} className='mt-5'>
                <input
                  {...register(`${id}-optionName` as any)}
                  // name={`${id}-optionName`}
                  className='py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2'
                  type='text'
                  placeholder='Option Name'
                />
                <input
                  {...register(`${id}-optionExtra` as any)}
                  className='w-36 py-2 px-4 focus:outline-none focus:border-gray-600 border-2'
                  type='number'
                  min={0}
                  placeholder='Option Extra'
                />
                <span
                  className='cursor-pointer text-white bg-red-500 ml-3 py-3 px-4 mt-5'
                  onClick={() => onDeleteClick(id)}
                >
                  Delete Option
                </span>
              </div>
            ))}
        </div>

        <Button loading={loading} isValid={isValid} actionText='Create Dish' />
      </form>
    </div>
  );
};
