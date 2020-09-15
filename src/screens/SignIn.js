import React, {useState} from 'react';
import {Button, Error, Form, Input} from '../components/AuthForm';
import {Link, Redirect, useHistory} from 'react-router-dom';
import SignUp from './SignUp';
import APIHandler from '../APIHandler';
import ReviewList from './ReviewList';
import {useAuth} from '../contexts/auth';

function SignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const {isAuthenticated, setAuth} = useAuth();
  const history = useHistory();

  function postSignIn() {
    APIHandler.post('/account/sign_in/', {
      email,
      password,
    }).then(result => {
      if (result.status === 200) {
        setAuth(true);
        // Render again if this function is called, so <Redirect/> below is enough.
        // history.push(ReviewList.routeName);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  if (isAuthenticated) {
    return <Redirect to={ReviewList.routeName}/>;
  }

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
        {isError && <Error>로그인 도중 문제가 발생했습니다. 관리자에게 문의하세요!</Error>}
      </Form>
  );
}

SignIn.routeName = '/';
export default SignIn;
