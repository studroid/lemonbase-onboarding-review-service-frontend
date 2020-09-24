import styled from 'styled-components';
import {Button as AntdButton, Form, Input} from 'antd';
import React from 'react';

function Button(props) {
  return <AntdButton type='primary' {...props}/>;
}

const SmallButton = styled(Button)`
  width: 50%;
`;

const Error = styled.div`
  background-color: red;
`;

export {Form, Input, Button, SmallButton, Error};
