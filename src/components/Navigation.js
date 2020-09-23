import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectIsAuthenticated, setAuthentication} from '../redux/userSlice';
import APIHandler from '../APIHandler';
import SignIn from '../screens/SignIn';
import {Link} from 'react-router-dom';

function Navigation(props) {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  function postSignOut() {
    return APIHandler.post(`/account/sign_out/`).then(result => {
      return result.status === 200;
    }).catch(e => {
      return false;
    });
  }

  function signOut() {
    dispatch(setAuthentication(false));
    postSignOut().then(result => {
      if (result === false) {
        dispatch(setAuthentication(true));
        alert('로그아웃에 실패했습니다. 다시 시도해보세요!');
      }
    }).catch(e => {
      alert('로그아웃에 실패했습니다. 다시 시도해보세요!');
    });
  }

  return (
      <nav>
        <ul>
          <li><Link to={SignIn.routeName}>Home</Link></li>
          {isAuthenticated &&
          <li><Link to="/" onClick={signOut}>Sign Out</Link></li>}
        </ul>
      </nav>
  );
}

export default Navigation;
