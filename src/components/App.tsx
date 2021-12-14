import React from 'react';
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { LoggedInRouter } from '../routers/loggedInRouter';
import { LoggedOutRouter } from '../routers/loggedOutRouter';
import { isLoggedInVar } from '../apollo';


export const App = () => {

  const isLoggedIn = useReactiveVar(isLoggedInVar)

  return isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />;
}

export default App;
