import React from 'react';
import logo from '../../assets/logos/LOGO-KUHNIPAY-B.png';
import './Header.css';

export default function Header() {
    console.log(logo);
  return (
    <div className="header-block">
        <img src={logo} alt='Logo Kuhnipay' className='header-logo' />
        <h1 className='header-title'>Sistemas Internos</h1>
    </div>
  )
}
