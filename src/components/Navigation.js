import React from 'react';
import APIHandler from '../APIHandler';
import SignIn from '../screens/SignIn';
import {Link} from 'react-router-dom';
import {useUserStore} from "../zustand/userStore";

function Navigation(props) {
  const userStore = useUserStore();
  const authData = userStore.authData;

  function postSignOut() {
    return APIHandler.post(`/account/sign_out/`).then(result => {
      return result.status === 200;
    }).catch(e => {
      return false;
    });
  }

  function signOut() {
    const name = userStore.authData.name;
    userStore.setAuthentication(false, '');
    postSignOut().then(result => {
      if (result === false) {
        userStore.setAuthentication(true, name);
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
