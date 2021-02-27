import React from 'react';
import headerLogo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <img src={headerLogo} alt="Around the US Logo" className="header__logo" />
      <div className="header__content">
        <p className="header__text">{props.email}</p>
        <Link className="header__text header__link" to={props.link}><span onClick={props.onClick}>{props.linkName}</span></Link>
      </div>
    </header>
  );
}

export default Header;