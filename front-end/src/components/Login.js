import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleLogin(email, password);
  }

  return (
    <div className="form">
      <form action="#" onSubmit={handleSubmit} className="form__container">
        <h2 className="form__title">Log in</h2>
        <input required className="form__input" id="email" name="email" type="email" value={email} placeholder="email" onChange={e => setEmail(e.target.value)} />
        <input required className="form__input" id="password" placeholder="password" name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" className="form__button button">Log in</button>
        <Link to="/signup" className="form__link">Not a member yet?  Sign up here!</Link>
      </form>
    </div>
  )
}
