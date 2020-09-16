import React, {useState} from 'react';
import {hot} from 'react-hot-loader';
import './App.css';
import {
  BrowserRouter as Router, Link,
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
import {AuthContext} from './contexts/auth';

function App(props) {
  const [isAuthenticated, setAuth] = useState(false);

  function signOut() {
    setAuth(false);
  }

  return (
      <AuthContext.Provider value={{isAuthenticated, setAuth}}>
        <Router>
          <nav>
            <ul>
              <li><Link to={SignIn.routeName}>Home</Link></li>
              {isAuthenticated && <li><Link to="/" onClick={signOut}>Sign Out</Link></li>}
            </ul>
          </nav>

          <Switch>
            <Route exact path={SignIn.routeName} component={SignIn}/>
            <Route path={SignUp.routeName} component={SignUp}/>
            <PrivateRoute path={ReviewList.routeName} component={ReviewList}/>
            <PrivateRoute path={ReviewCreate.routeName}
                          component={ReviewCreate}/>
            <PrivateRoute path={ReviewUpdate.routeName}
                          component={ReviewUpdate}/>
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
