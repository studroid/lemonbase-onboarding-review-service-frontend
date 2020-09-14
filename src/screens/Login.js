import React from 'react';
import {Link} from 'react-router-dom';

function Login(props) {
  return (
      <nav>
        <ul>
          <li><Link to="/sign_up">회원가입</Link></li>
        </ul>
      </nav>
  );
}

Login.routeName = '/';
export default Login;
