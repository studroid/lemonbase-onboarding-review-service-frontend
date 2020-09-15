import React, {useState} from 'react';
import {Button, Error, Form, Input} from '../components/AuthForm';
import {useHistory} from 'react-router-dom';
import SignIn from './SignIn';
import APIHandler from '../APIHandler';

function SignUp(props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const history = useHistory();

  function postSignUp() {
    APIHandler.post('/account/sign_up/', {
      email,
      name,
      password,
    }).then(result => {
      if (result.status === 201) {
        alert('회원가입이 완료되었습니다!');
        history.push(SignIn.routeName);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  return (
      <Form>
        <h2>SignUp</h2>
        <Input type="email" value={email} placeholder="Email" onChange={e => {
          setEmail(e.target.value);
        }}/>
        <Input type="text" value={name} placeholder="Name" onChange={e => {
          setName(e.target.value);
        }}/>
        <Input type="password" placeholder="Password" onChange={e => {
          setPassword(e.target.value);
        }}/>
        <Button onClick={postSignUp}>가입하기</Button>
        {isError && <Error>회원가입 도중 문제가 발생했습니다. 관리자에게 문의하세요!</Error>}
      </Form>
  );
}

SignUp.routeName = '/sign_up';
export default SignUp;
