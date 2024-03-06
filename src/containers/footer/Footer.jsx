import React from 'react'
import '../footer/footer.css';
import logo from '../../assets/icons/logo-full_width.png';

const Footer = () => {
  return (
    <div className='footer__container'>
        <img src={logo}></img>
        <p>Taft Overflow , Inc. @2024. All rights reserved.</p>
    </div>
  )
}

export default Footer