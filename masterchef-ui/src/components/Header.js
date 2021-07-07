import React from 'react';
import logo from '../assets/masterchef_logo.png'

const Header = ({title}) => {
  return (
    <>
      <header>
        <img src={logo} alt={title} />
      </header>
      <h1>{title}</h1>
    </>
  )
}

export default Header;