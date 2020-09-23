import React from 'react';
import {hot} from 'react-hot-loader';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ReviewList from './screens/ReviewList';
import ReviewCreate from './screens/ReviewCreate';
import ReviewUpdate from './screens/ReviewUpdate';
import PrivateRoute from './PrivateRoute';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import userReducer from './redux/userSlice';
import Navigation from './components/Navigation';

function App(props) {
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });

  store.subscribe(() => {
    const {isAuthenticated} = store.getState().user;
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  });

  return (
      <Provider store={store}>
        <Router>
          <Navigation/>

          <Switch>
            <Route exact path={SignIn.routeName} component={SignIn.component}/>
            <Route path={SignUp.routeName} component={SignUp.component}/>
            <PrivateRoute path={ReviewList.routeName}
                          component={ReviewList.component}/>
            <PrivateRoute path={ReviewCreate.routeName}
                          component={ReviewCreate.component}/>
            <PrivateRoute path={ReviewUpdate.routeName}
                          component={ReviewUpdate.component}/>
            <Route path="*">
              <NoMatch/>
            </Route>
          </Switch>
        </Router>
      </Provider>
  );
}

function NoMatch() {
  let location = useLocation();

  return (
      <div>
        <h3>
          No match for <code>{location.pathname}</code>
        </h3>
      </div>
  );
}

export default hot(module)(App);
