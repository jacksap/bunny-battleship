import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LoginPage.css';


const LoginPage = (props) => {
  return (
    <div>
      <LoginForm
        {...props}
      />
    </div>
  );
};

export default LoginPage;