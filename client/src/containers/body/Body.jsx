import React, { useState } from 'react';
import './body.css';

const Body = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", { username, password, rememberMe });
  };

  return (
    <div className="body__container">
      <div className="body__welcome">Welcome to</div>
      <div className="body__title">Taft Overflow</div>
      <div className="body__content">
        <form onSubmit={handleSubmit}>
          <div className="body__user-details">
            <div className="body__user-details__input-box__username">
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="body__user-details">
              <div className="body__user-details__input-box__password">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="body__user-details__remember-me">
                <label>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>
              </div>
            </div>
          </div>
          <div className="body__login-button">
            <div className="body__login-button__button">
              <input type="submit" value="Login" />
            </div>
            <div className="body__login-button__login">
              Not a member? <span>Sign up</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Body;
