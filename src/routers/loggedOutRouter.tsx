import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Login } from '../pages/login';
import { Register } from '../pages/register';
import { NotFound } from '../pages/404';

export const LoggedOutRouter = () => {

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path='/' exact>
            <Login />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch> 
      </Router>
    </div>
  );
};
