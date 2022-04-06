import React, { useState } from 'react';
import $ from 'jquery';
import Loading from './Loading.js';
import ErrorMessage from './ErrorMessage.js';
import { useNavigate } from 'react-router-dom';

function LoginRegister() {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [message, setMessage] = useState(null)
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState(false);

  const navigate = useNavigate();


  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoginLoading(true);
      await $.ajax({
        method: 'POST',
        url: 'http://localhost:3001/users/login',
        data: {
          username: loginUsername,
          password: loginPassword
        },
        datatype: 'json',
        success: (data) => {
          console.log(data);
          localStorage.setItem('userInfo', JSON.stringify(data));
          navigate('/');
          window.location.reload(false);
        }
      })

      setLoginLoading(false)


    } catch (err) {
      setLoginLoading(false);
      setLoginError(err.responseJSON.message)
    }

  }

  const handleRegSubmit = async(e) => {
    e.preventDefault();

    if (regPassword !== retypePassword) {
      setMessage('Passwords do not match!')
    } else {
      setMessage(null)
      try {
        setRegLoading(true)
        await $.ajax({
          method: 'POST',
          url: 'http://localhost:3001/users',
          data: {
            email: regEmail,
            username: regUsername,
            password: regPassword
          },
          datatype: 'json',
          success: (data) => {
            alert('You have successfully created an account on NBA-Hub!')
            navigate('/login-register')
          }
        })
        setRegLoading(false)
      } catch (err) {
        setRegLoading(false)
        setRegError(err.responseJSON.message)
      }
    }



  }

  return(
    <div className="loginRegisterContainer">
      <div className="loginContainer">
        {loginError && <ErrorMessage variant='danger'>{loginError}</ErrorMessage>}
        {loginLoading && <Loading/>}
        <h4 className="loginHeader">Login</h4>
        <form onSubmit={handleLoginSubmit}>
          <input className="loginInput" type="text" placeholder="Email or Username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)}></input>
          <input className="loginInput" type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}></input>
          <button className="loginButton" type="submit">Log In</button>
        </form>
      </div>

      <div className="registerContainer">
        {regError && <ErrorMessage variant='danger'>{regError}</ErrorMessage>}
        {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
        {regLoading && <Loading/>}
        <h4 className="loginHeader">Register</h4>
        <form onSubmit={handleRegSubmit}>
          <input className="loginInput" type="text" placeholder="Email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)}></input>
          <input className="loginInput" type="text" placeholder="Username" value={regUsername} onChange={(e) => setRegUsername(e.target.value)}></input>
          <input className="loginInput" type="password" placeholder="Password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)}></input>
          <input className="loginInput" type="password" placeholder="Retype Password" value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)}></input>
          <button className="loginButton" type="submit">Register</button>
        </form>
      </div>
    </div>
  )

}

export default LoginRegister
