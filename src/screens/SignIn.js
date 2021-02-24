import React, {useState} from 'react';
import {Button, Error, Form, Input} from '../components/StyledComponents';
import {Link, Redirect, useHistory} from 'react-router-dom';
import SignUp from './SignUp';
import APIHandler from '../APIHandler';
import ReviewList from './ReviewList';
import SuperComponent from '../super/SuperComponent';
import {useUserStore} from "../zustand/userStore";

function Component(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const userStore = useUserStore();
  const history = useHistory();

  function postSignIn() {
    APIHandler.post('/account/sign_in/', {
      email,
      password,
    }).then(result => {
      if (result.status === 200) {
        userStore.setAuthentication(true, result.data.name);
        // Render again if this function is called, so <Redirect/> below is enough.
        // history.push(ReviewList.routeName);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  if (userStore.authData && userStore.authData.isAuthenticated) {
    return <Redirect to={ReviewList.routeName}/>;
  }

  const renderErrorMessage = isError && <Error>로그인 도중 문제가 발생했습니다. 관리자에게 문의하세요!</Error>

  return (
      <Form>
        <h2>로그인</h2>
        <Input type="email" value={email} placeholder="Email" onChange={e => {
          setEmail(e.target.value);
        }}/>
        <Input type="password" placeholder="Password" onChange={e => {
          setPassword(e.target.value);
        }}/>
        <Button onClick={postSignIn}>로그인</Button>

        <Link to={SignUp.routeName}>회원가입</Link>
        {renderErrorMessage}
      </Form>
  );
}

const SignIn = {
  ...SuperComponent,
  routeName: '/',
  component: Component,
};

export default SignIn;
