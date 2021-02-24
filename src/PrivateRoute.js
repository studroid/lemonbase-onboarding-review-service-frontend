import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import SignIn from './screens/SignIn';
import {useUserStore} from "./zustand/userStore";

function PrivateRoute({component: Component, ...rest}) {
  const isAuthenticated = useUserStore().authData.isAuthenticated;
  return (
      <Route {...rest} render={(props) =>
          isAuthenticated ? (
              <Component {...props}/>
          ) : (
              <Redirect to={SignIn.routeName}/>
          )}
      />
  );
}

export default PrivateRoute;
