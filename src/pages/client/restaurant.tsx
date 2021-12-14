import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useParams } from 'react-router-dom';
import { Dish } from '../../components/Dish';
import { DishOption } from '../../components/DishOption';
import {
  CreateOrderItemInput,
  useCreateDishMutation,
  useCreateOrderMutation,
  useRestaurantQuery,
} from '../../generated/graphql';

interface RestaurantProps {
  id: string;
}

export const Restaurant = () => {
  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);

  const history = useHistory();
  const { id } = useParams<RestaurantProps>();

  const [createOrder, { loading: placingOrder }] = useCreateOrderMutation();

  const { data } = useRestaurantQuery({
    variables: { input: { restaurantId: +id } },
  });

  const triggerStartOrder = () => {
    setOrderStarted(true);
  };

  const triggerCancelOrder = () => {
    setOrderStarted(false);
    setOrderItems([]);
  };

  const triggerConfirmOrder = async () => {
    if (placingOrder) {
      return;
    }
    if (orderItems.length === 0) {
      alert("Can't place empty order");
      return;
    }
    const ok = window.confirm('You are about to place an order');
    if (ok) {
      const res = await createOrder({
        variables: {
          input: {
            restaurantId: +id,
            items: orderItems,
          },
        },
      });
      if (res.data?.createOrder.success) {
        history.push(`/orders/${res.data.createOrder.orderId}`);
      }
    }
  };

  const getItem = (dishId: number) => {
    return orderItems.find((order) => order.dishId === dishId);
  };
  const isSelected = (dishId: number) => {
    return Boolean(getItem(dishId));
  };

  const addItemToOrder = (dishId: number) => {
    if (isSelected(dishId)) {
      return;
    }
    setOrderItems((current) => [{ dishId, options: [] }, ...current]);
  };
  const removeFromOrder = (dishId: number) => {
    setOrderItems((current) => current.filter((dish) => dish.dishId !== dishId));
  };

  const addOptionToItem = (dishId: number, optionName: any) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      const hasOption = Boolean(oldItem.options?.find((aOption) => aOption.name === optionName));
      if (!hasOption) {
        removeFromOrder(dishId);
        setOrderItems((current) => [{ dishId, options: [{ name: optionName }, ...oldItem.options!] }, ...current]);
      }
    }
  };

  const removeOptionFromItem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      removeFromOrder(dishId);
      setOrderItems((current) => [
        {
          dishId,
          options: oldItem.options?.filter((option) => option.name !== optionName),
        },
        ...current,
      ]);
      return;
    }
  };
  const getOptionFromItem = (item: CreateOrderItemInput, optionName: string) => {
    return item.options?.find((option) => option.name === optionName);
  };
  const isOptionSelected = (dishId: number, optionName: string) => {
    const item = getItem(dishId);
    if (item) {
      return Boolean(getOptionFromItem(item, optionName));
    }
    return false;
  };

  return (
    <div>
      <Helmet>
        <title>{data?.restaurant.restaurant?.name || ''} | Super Eats</title>
      </Helmet>
      <div
        className='py-48 bg-gray-800 bg-center bg-cover'
        style={{
          backgroundImage: `url(${data?.restaurant.restaurant?.image})`,
        }}
      >
        <div className='w-3/12 py-8 pl-48 bg-white'>
          <h4 className='mb-3 text-4xl'>{data?.restaurant.restaurant?.name}</h4>
          <h5 className='mb-2 text-sm font-light'>{data?.restaurant.restaurant?.category?.name}</h5>

          <h6 className='text-sm font-light'>{data?.restaurant.restaurant?.address}</h6>
        </div>
      </div>
      <div className='container flex flex-col items-end pb-32 mt-20'>
        {!orderStarted && (
          <button className='px-8 btn' onClick={triggerStartOrder}>
            Start Order
          </button>
        )}
        {orderStarted && (
          <div className='flex items-center'>
            <button className='px-10 py-2 mr-3 btn' onClick={triggerConfirmOrder}>
              Confirm Order
            </button>
            <button className='text-lg px-10 py-4 text-white bg-black  hover:bg-black' onClick={triggerCancelOrder}>
              Cancel Order
            </button>
          </div>
        )}
        <div className='w-full mt-16 grid md:grid-cols-3 gap-x-5 gap-y-10'>
          {data?.restaurant.restaurant?.menu?.map((dish, index) => (
            <Dish
              id={dish.id}
              isSelected={isSelected(dish.id)}
              orderStarted={orderStarted}
              key={index}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              // @ts-ignore
              photo={dish.photo}
              isCustomer={true}
              options={dish.options}
              addItemToOrder={addItemToOrder}
              removeFromOrder={removeFromOrder}
            >
              {dish.options?.map((option, index) => (
                <DishOption
                  key={index}
                  isSelected={isOptionSelected(dish.id, option.name)}
                  name={option.name}
                  extra={option.extra}
                  dishId={dish.id}
                  addOptionToItem={addOptionToItem}
                  removeOptionFromItem={removeOptionFromItem}
                />
              ))}
            </Dish>
          ))}
        </div>
      </div>
    </div>
  );
};
