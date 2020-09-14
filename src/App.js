import React from 'react';
import {hot} from 'react-hot-loader';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import ReviewList from './screens/ReviewList';
import ReviewCreate from './screens/ReviewCreate';
import ReviewUpdate from './screens/ReviewUpdate';
import PrivateRoute from './PrivateRoute';
import {AuthContext} from './contexts/auth';

function App(props) {
  return (
      <AuthContext.Provider value={false}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/sign_up" component={SignUp}/>
            <PrivateRoute path="/list" component={ReviewList}/>
            <PrivateRoute path="/create" component={ReviewCreate}/>
            <PrivateRoute path="/update/:id" component={ReviewUpdate}/>
            <Route path="*">
              <NoMatch/>
            </Route>
          </Switch>
        </Router>
      </AuthContext.Provider>
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
