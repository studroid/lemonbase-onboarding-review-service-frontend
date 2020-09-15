import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, Input} from '../components/AuthForm';
import SignUp from './SignUp';

function SignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
      <Form>
        <Input type="email" placholder="Email"/>
        <Input type="password" placholder="Password"/>
        <Button>로그인</Button>

        <Link to={SignUp.routeName}>회원가입</Link>
      </Form>
  );
}

SignIn.routeName = '/';
export default SignIn;
