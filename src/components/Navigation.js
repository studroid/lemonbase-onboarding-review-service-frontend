import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuthData, setAuthentication} from '../redux/userSlice';
import APIHandler from '../APIHandler';
import SignIn from '../screens/SignIn';
import {Link} from 'react-router-dom';

function Navigation(props) {
  const dispatch = useDispatch();
  const authData = useSelector(selectAuthData);

  function postSignOut() {
    return APIHandler.post(`/account/sign_out/`).then(result => {
      return result.status === 200;
    }).catch(e => {
      return false;
    });
  }

  function signOut() {
    const prevAuthData = authData;
    dispatch(setAuthentication({isAuthenticated: false, name: ""}));
    postSignOut().then(result => {
      if (result === false) {
        dispatch(setAuthentication(prevAuthData));
        alert('로그아웃에 실패했습니다. 다시 시도해보세요!');
      }
    }).catch(e => {
      alert('로그아웃에 실패했습니다. 다시 시도해보세요!');
    });
  }

  return (
      <>
        {authData && authData.isAuthenticated &&
        <h1>{authData.name}님, 안녕하세요!</h1>}

        <nav>
          <ul>
            <li><Link to={SignIn.routeName}>Home</Link></li>
            {authData && authData.isAuthenticated &&
            <li><Link to="/" onClick={signOut}>Sign Out</Link></li>}
          </ul>
        </nav>
      </>
  );
}

export default Navigation;
