import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import ReviewList from './screens/ReviewList';
import ReviewCreate from './screens/ReviewCreate';
import ReviewUpdate from './screens/ReviewUpdate';

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <nav>
              <ul>
                <li><Link to="/">111</Link></li>
                <li><Link to="/sign_up">222</Link></li>
                <li><Link to="/update/3">333</Link></li>
              </ul>
            </nav>
            <Switch>
              <Route exact path="/" component={Login}/>
              <Route path="/sign_up" component={SignUp}/>
              <Route path="/list" component={ReviewList}/>
              <Route path="/create" component={ReviewCreate}/>
              <Route path="/update/:id" component={ReviewUpdate}/>
              <Route path="*">
                <NoMatch/>
              </Route>
            </Switch>
          </div>
        </Router>
    );
  }
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
