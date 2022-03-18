import React from 'react';

class LoginRegister extends React.Component {

  render() {
    return(
      <div className="loginRegisterContainer">
        <div className="loginContainer">
          <h4 className="loginHeader">Login</h4>
          <form>
            <input className="loginInput" type="text" placeholder="Email or Username"></input>
            <input className="loginInput" type="text" placeholder="Password"></input>
            <button className="loginButton" type="submit">Log In</button>
          </form>
        </div>

        <div className="registerContainer">
          <h4 className="loginHeader">Register</h4>
          <form>
            <input className="loginInput" type="text" placeholder="Email"></input>
            <input className="loginInput" type="text" placeholder="Username"></input>
            <input className="loginInput" type="text" placeholder="Password"></input>
            <input className="loginInput" type="text" placeholder="Retype Password"></input>
            <button className="loginButton" type="submit">Register</button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRegister
