import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", { username, password, rememberMe });
  };

  return (
    <div className="login__container-container">
    <div className="login__container">
      <div className="login__welcome">Welcome to</div>
      <div className="login__title">Taft Overflow</div>
      <div className="login__content">
        <form onSubmit={handleSubmit}>
          <div className="login__user-details">
            <div className="login__user-details__input-box__username">
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="login__user-details">
              <div className="login__user-details__input-box__password">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="login__user-details__remember-me">
                <label>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                 <span>Remember me</span>
                </label>
              </div>
            </div>
          </div>
          <div className="login__login-button">
            <div className="login__login-button__button">
              <input type="submit" value="Login" />
            </div>
            <div className="login__login-button__login">
              Not a member? <span>Sign up</span>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;