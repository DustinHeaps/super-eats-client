import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';

import { OrderUpdatesDocument, useEditOrderMutation, useGetOrderQuery, useMeQuery } from '../generated/graphql';

interface IParams {
  id: string;
}

export const Order = () => {
  const { id } = useParams<IParams>();
  const { data: userData } = useMeQuery();
  const [editOrder] = useEditOrderMutation();

  const { data, subscribeToMore } = useGetOrderQuery({
    variables: {
      input: {
        id: +id,
      },
    },
  });

  useEffect(() => {
    if (data?.getOrder.success) {
      subscribeToMore({
        document: OrderUpdatesDocument,
        variables: {
          input: {
            id: +id,
          },
        },
        updateQuery: (prev, { subscriptionData: { data } }: { subscriptionData: { data: any } }) => {
          if (!data) return prev;
          return {
            getOrder: {
              ...prev.getOrder,
              order: {
                ...data.orderUpdates,
              },
            },
          };
        },
      });
    }
  }, [data]);

  const onButtonClick = (newStatus: any) => {
    editOrder({
      variables: {
        input: {
          id: +id,
          status: newStatus,
        },
      },
    });
  };

  return (
    <div className='container flex justify-center mt-32'>
      <Helmet>
        <title>Order #{id} | Super Eats</title>
      </Helmet>
      <div className='flex flex-col justify-center w-full border border-gray-800 max-w-screen-sm'>
        <h4 className='w-full py-5 text-xl text-center bg-gray-800 text-white'>Order #{id}</h4>
        <h5 className='p-5 pt-10 text-3xl text-center'>${data?.getOrder.order?.total}</h5>

        <div className='p-5 text-xl grid gap-6'>
          <div className='pt-5 border-t border-gra-y-700'>
            Prepared By: <span className='font-medium'>{data?.getOrder.order?.restaurant?.name}</span>
          </div>
          <div className='pt-5 border-t border-gray-700 '>
            Deliver To: <span className='font-medium'>{data?.getOrder.order?.customer?.email}</span>
          </div>
          <div className='py-5 border-t border-b border-gray-700'>
            Driver: <span className='font-medium'>{data?.getOrder.order?.driver?.email || 'Not yet.'}</span>
          </div>
          {userData?.me.role === 'Client' && (
            <span className='mt-5 mb-3 text-2xl text-center text-lime-600'>
              Order Status: {data?.getOrder.order?.status}
            </span>
          )}
          {userData?.me.role === 'Owner' && (
            <>
              {data?.getOrder.order?.status === 'Pending' && (
                <button className='btn' onClick={() => onButtonClick('Cooking')}>
                  Accept Order
                </button>
              )}
              {data?.getOrder.order?.status === 'Cooking' && (
                <button className='btn' onClick={() => onButtonClick('Cooked')}>
                  Order Cooked
                </button>
              )}

              {data?.getOrder.order?.status !== 'Cooking' && data?.getOrder.order?.status !== 'Pending' && (
                <span className='mt-5 mb-3 text-2xl text-center text-lime-600'>
                  Status {data?.getOrder.order?.status}
                </span>
              )}
            </>
          )}

          {userData?.me.role === 'Driver' && (
            <>
              {data?.getOrder.order?.status === 'Cooked' && (
                <button className='btn' onClick={() => onButtonClick('PickedUp')}>
                  Picked Up
                </button>
              )}
              {data?.getOrder.order?.status === 'PickedUp' && (
                <button className='btn' onClick={() => onButtonClick('Delivered')}>
                  Order Delivered
                </button>
              )}
            </>
          )}

          {data?.getOrder.order?.status === 'Delivered' && (
            <span className='text-center text-gray-800'>Thank you for using Super Eats</span>
          )}
        </div>
      </div>
    </div>
  );
};
