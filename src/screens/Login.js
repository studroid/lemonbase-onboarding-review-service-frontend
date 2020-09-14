import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, Input} from '../components/AuthForm';
import SignUp from './SignUp';

function Login(props) {
  return (
      <Form>
        <Input type="email" placholder="Email"/>
        <Input type="password" placholder="Password"/>
        <Button>로그인</Button>

        <Link to={SignUp.routeName}>회원가입</Link>
      </Form>
  );
}

Login.routeName = '/';
export default Login;
