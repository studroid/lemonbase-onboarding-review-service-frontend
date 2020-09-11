import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useLocation,
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/users">Users</Link>
                </li>
                <li>
                  <Link to="/about/3">About Params</Link>
                </li>
              </ul>
            </nav>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
              <Route exact path="/">
                <Home/>
              </Route>
              <Route path="/about/:id">
                <About/>
              </Route>
              <Route path="/about">
                <About/>
              </Route>
              <Route path="/users">
                <Users/>
              </Route>
              <Route path="*">
                <NoMatch/>
              </Route>
            </Switch>
          </div>
        </Router>
    );
  }
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  let {id} = useParams();

  return <h2>About {id}</h2>;
}

function Users() {
  return <h2>Users</h2>;
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
