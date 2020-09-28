import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import SignIn from './screens/SignIn';
import {useSelector} from 'react-redux';
import {selectAuthData} from './redux/userSlice';

function PrivateRoute({component: Component, ...rest}) {
  const isAuthenticated = useSelector(selectAuthData);;
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
