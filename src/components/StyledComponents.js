import styled from 'styled-components';
import {Button as AntdButton} from 'antd';
import React from 'react';

const Button = props => <AntdButton type='primary' {...props}>{props.children}</AntdButton>;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  padding: 1rem;
`;

const SmallButton = styled(Button)`
  width: 50%;
`;

const Error = styled.div`
  background-color: red;
`;

export {Form, Input, Button, SmallButton, Error};
