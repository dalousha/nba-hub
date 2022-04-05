import React, { useState } from 'react';
import $ from 'jquery';

function LoginRegister() {
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [regUsername, setRegUsername] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')

  const handleLoginSubmit = (e) => {
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3001/users/login',
      data: {
        username: loginUsername,
        password: loginPassword
      },
      datatpye: 'json',
      success: (data) => {
        console.log('data: ', data)
      }
    })
  }

  const handleRegSubmit = (e) => {
    $.ajax({
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
      }
    })
  }

  return(
    <div className="loginRegisterContainer">
      <div className="loginContainer">
        <h4 className="loginHeader">Login</h4>
        <form onSubmit={handleLoginSubmit}>
          <input className="loginInput" type="text" placeholder="Email or Username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)}></input>
          <input className="loginInput" type="text" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}></input>
          <button className="loginButton" type="submit">Log In</button>
        </form>
      </div>

      <div className="registerContainer">
        <h4 className="loginHeader">Register</h4>
        <form onSubmit={handleRegSubmit}>
          <input className="loginInput" type="text" placeholder="Email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)}></input>
          <input className="loginInput" type="text" placeholder="Username" value={regUsername} onChange={(e) => setRegUsername(e.target.value)}></input>
          <input className="loginInput" type="text" placeholder="Password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)}></input>
          <input className="loginInput" type="text" placeholder="Retype Password" value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)}></input>
          <button className="loginButton" type="submit">Register</button>
        </form>
      </div>
    </div>
  )

}

export default LoginRegister
