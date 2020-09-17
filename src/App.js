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
import APIHandler from './APIHandler';

function App(props) {
  const previousAuthState = JSON.parse(localStorage.getItem('isAuthenticated'));
  const [isAuthenticated, setAuthState] = useState(previousAuthState);

  function postSignOut() {
    return APIHandler.post(`/account/sign_out/`).then(result => {
      if (result.status === 200) {
        return true;
      }
      return false;
    }).catch(e => {
      return false;
    });
  }

  function setAuth(flag) {
    localStorage.setItem('isAuthenticated', JSON.stringify(flag));
    setAuthState(flag);
  }

  function signOut() {
    setAuth(false);
    postSignOut().then(result => {
      if (result === false) {
        setAuth(true);
        alert('로그아웃에 실패했습니다. 다시 시도해보세요!');
      }
    }).catch(e => {
      alert('로그아웃에 실패했습니다. 다시 시도해보세요!');
    });
  }

  return (
      <AuthContext.Provider value={{isAuthenticated, setAuth}}>
        <Router>
          <nav>
            <ul>
              <li><Link to={SignIn.routeName}>Home</Link></li>
              {isAuthenticated &&
              <li><Link to="/" onClick={signOut}>Sign Out</Link></li>}
            </ul>
          </nav>

          <Switch>
            <Route exact path={SignIn.routeName} component={SignIn.component}/>
            <Route path={SignUp.routeName} component={SignUp.component}/>
            <PrivateRoute path={ReviewList.routeName} component={ReviewList.component}/>
            <PrivateRoute path={ReviewCreate.routeName}
                          component={ReviewCreate.component}/>
            <PrivateRoute path={ReviewUpdate.routeName}
                          component={ReviewUpdate.component}/>
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
