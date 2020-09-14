import React from 'react';
import {Button, Form, Input} from '../components/AuthForm';

function SignUp(props) {
  return (
      <Form>
        <h2>SignUp</h2>
        <Input type="email" placeholder="Email"/>
        <Input type="text" placeholder="Name"/>
        <Input type="password" placeholder="Password"/>
        <Button>가입하기</Button>
      </Form>
  );
}

SignUp.routeName = '/sign_up';
export default SignUp;
