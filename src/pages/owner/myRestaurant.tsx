import React, { useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Dish } from '../../components/Dish';
import { useCreatePaymentMutation, useMeQuery, useMyRestaurantQuery } from '../../generated/graphql';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryPie,
  VictoryTheme,
  VictoryVoronoiContainer,
} from 'victory';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';

interface Params {
  id: string;
}

export const MyRestaurant = () => {
  const { id } = useParams<Params>();
 
  const [createPayment, { loading }] = useCreatePaymentMutation();

  const chartData = [
    { x: 1, y: 3000 },
    { x: 2, y: 1500 },
    { x: 3, y: 4200 },
    { x: 4, y: 2300 },
    { x: 5, y: 7100 },
    { x: 6, y: 6500 },
    { x: 7, y: 4500 },
  ];


  const convert = () => {
    data?.myRestaurant.restaurant?.orders?.forEach((ord) => {
      var d = new Date(ord.createdAt);
      console.log(moment(ord.createdAt).format('YYYY/MM/D hh:mm:ss SSS'));
    
    });
  };
  const history = useHistory();

  useEffect(() => {
    convert();
    // if (subscriptionData?.pendingOrders.id) {
    //   history.push(`/opders/${subscriptionData.pendingOrders.id}`);
    // }
  }, []);
  // }, [subscriptionData]);
  const { data: meData } = useMeQuery();
  const { data } = useMyRestaurantQuery({
    variables: {
      input: {
        id: +id,
      },
    },
  });
  const triggerPaddlePayment = () => {
    if (meData?.me.email) {
      // @ts-ignore
      window.Paddle.Environment.set('sandbox');
      // @ts-ignore
      window.Paddle.Setup({ vendor: 3900 });
      // @ts-ignore
      window.Paddle.Checkout.open({
        product: 20543,
        email: meData?.me.email,
        successCallback: async (data: any) => {
          const res = await createPayment({
            variables: {
              input: {
                transactionId: data.checkout.id,
                restaurantId: +id,
              },
            },
          });
          if (res.data?.createPayment.success) {
            alert('Your restaurant is being promoted!');
          }
        },
      });
    }
  };
  const restaurant = data?.myRestaurant.restaurant;

  return (
    <div>
      <Helmet>
        <title>{restaurant?.name || '...loading'} | Super Eats</title>
        <script src='https://cdn.paddle.com/paddle/paddle.js'></script>
      </Helmet>

      <div
        className='bg-gray-700 bg-center bg-cover py-28'
        style={{
          backgroundImage: `url('${restaurant?.image}')`,
        }}
      ></div>
      <div className='container mx-auto mt-10'>
        {restaurant && (
          <>
            <h2 className='text-4xl font-medium'>{restaurant?.name}</h2>
            <h4 className='mb-5 pt-1 font-light text-xs text-gray-600'>{restaurant?.address}</h4>
          </>
        )}

        <Link to={`/restaurants/${id}/add-dish`} className='px-10 py-3 mr-8 text-white bg-gray-800'>
          Add Dish &rarr;
        </Link>
        <span onClick={triggerPaddlePayment} className='px-10 py-3 text-white bg-lime-700'>
          Buy Promotion &rarr;
        </span>
        <div className='mt-10'>
          {restaurant?.menu?.length === 0 ? (
            <h4>Please upload a dish</h4>
          ) : (
            <div className='mt-16 grid md:grid-cols-3 gap-x-5 gap-y-10'>
              {restaurant?.menu?.map((dish, index) => (
                <Dish
                  key={index}
                  name={dish.name}
                  description={dish.description}
                  price={dish.price}
                  // @ts-ignore
                  photo={dish.photo}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className='mt-20 mb-10'>
     
          {restaurant?.orders?.length === 0 || !restaurant?.orders  ? (
            
            <h4 className='text-2xl font-medium text-center'>No Sales Yet</h4>
          ) : (
            <>
              <h4 className='text-2xl font-medium text-center'>Sales</h4>
              <div className='mx-auto'>
                <VictoryChart
                  height={500}
                  theme={VictoryTheme.material}
                  width={window.innerWidth}
                  domainPadding={50}
                  containerComponent={<VictoryVoronoiContainer />}
                >
                  <VictoryLine
                    labels={({ datum }) => `$${datum.y}`}
                    labelComponent={<VictoryLabel style={{ fontSize: 18 } as any} renderInPortal dy={-20} />}
                    data={restaurant?.orders?.map((order) => ({
                      x: order.createdAt.toString(),
                      y: order.total,
                    }))}
                    interpolation='linear'
                    style={{
                      data: {
                        stroke: 'blue',
                        strokeWidth: 5,
                      },
                    }}
                  />
                  <VictoryAxis
                    style={{
                      tickLabels: { fontSize: 20, fill: '#3d7c0f' } as any,
                    }}
                    dependentAxis
                    tickFormat={(tick) => `$${tick}`}
                  />
                  <VictoryAxis
                    tickLabelComponent={<VictoryLabel renderInPortal />}
                    style={{
                      tickLabels: {
                        fontSize: 20,
                        fill: '#3d7c0f',
                        angle: 45,
                      } as any,
                    }}
                    tickFormat={(tick) => new Date(tick).toLocaleDateString('ru')}
                  />
                </VictoryChart>
                {/* <VictoryPie data={chartData} />
            <VictoryChart domainPadding={20}>
              <VictoryAxis tickFormat={(step) => `$${step / 1000}k`} dependentAxis />
              <VictoryAxis tickFormat={(step) => `Day ${step}`} />
              <VictoryBar data={chartData} />
            </VictoryChart> */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
