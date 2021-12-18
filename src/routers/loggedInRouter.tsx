import React from 'react';
import { useMeQuery } from '../generated/graphql';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Restaurants } from '../pages/client/restaurants';
import { Header } from '../components/Header';
import { NotFound } from '../pages/404';
import { ConfirmEmail } from '../pages/user/confirmEmail';
import { EditProfile } from '../pages/user/editProfile';
import { Search } from '../pages/client/search';
import { Category } from '../pages/client/category';
import { Restaurant } from '../pages/client/restaurant';
import { MyRestaurants } from '../pages/owner/myRestaurants';
import { AddRestaurant } from '../pages/owner/createRestaurant';
import { MyRestaurant } from '../pages/owner/myRestaurant';
import { AddDish } from '../pages/owner/addDish';
import { Order } from '../pages/order';
import { Dashboard } from '../pages/driver/dashboard';

const CommonRoutes = [
  {
    path: '/confirm',
    component: <ConfirmEmail />,
  },
  {
    path: '/edit-profile',
    component: <EditProfile />,
  },
  {
    path: '/orders/:id',
    component: <Order />,
  },
];

const ClientRoutes = [
  {
    path: '/',
    component: <Restaurants />
  },
  {
    path: '/search',
    component: <Search />
  },
  {
    path: '/category/:slug',
    component: <Category />,
  },
  {
    path: '/restaurants/:id',
    component: <Restaurant />,
  },
];

const OwnerRoutes = [
  {
    path: '/',
    component: <MyRestaurants />
  },
  {
    path: '/add-restaurant',
    component: <AddRestaurant />
  },
  {
    path: '/restaurants/:id',
    component: <MyRestaurant />
  },
  {
    path: '/restaurants/:restaurantId/add-dish',
    component: <AddDish />
  }
];
const driverRoutes = [
  {
    path: '/',
    component: <Dashboard />,
  }
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMeQuery();

  if (!data || loading || error) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <span className='font-medium text-xl tracking-wide'>Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === 'Client' &&
          ClientRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}

        {data.me.role === 'Owner' &&
          OwnerRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {data.me.role === 'Driver' &&
          driverRoutes.map((route) => (
            <Route exact key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        {CommonRoutes.map((route) => (
          <Route key={route.path} path={route.path}>
            {route.component}
          </Route>
        ))}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
