import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import SignIn from './screens/SignIn';
import {useSelector} from 'react-redux';
import {selectIsAuthenticated} from './redux/userSlice';

function PrivateRoute({component: Component, ...rest}) {
  const isAuthenticated = useSelector(selectIsAuthenticated);;
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
