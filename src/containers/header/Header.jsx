import React from 'react'
import './header.css';
import { Navsearchbar } from '../../components/';
import { logo_full,menu,messages,notifications,profile,createpost } from './imports';

function clickMenu(id) {
    document.getElementById(id).classList.toggle("show");
}

const Header = () => {
  return (
    <div className="navbar section__padding">
      <div className="navbar__logo">
        <img src={logo_full}></img>
      </div>
      <div className="navbar__search">
        <Navsearchbar></Navsearchbar>
      </div>
      <div className="navbar__buttons">
        <div className='navbar__buttons-dropdown'>
          <button type="button" onClick={() => clickMenu("navbar__menu_dropdown")}><img src={menu}></img></button>
          <div id='navbar__menu_dropdown' className='navbar__buttons-dropdown_content scale-up-tr'>
            <a href="#">View Courses</a>
            <a href="#">View Topics</a>
          </div>
        </div>
        <button type="button"><img src={messages}></img></button>
        <button type="button"><img src={notifications}></img></button>
        <button type="button"><img src={createpost}></img></button>
        <div className='navbar__buttons-dropdown'>
          <button type="button" onClick={() => clickMenu("navbar__profile_dropdown")}><img src={profile}></img></button>
          <div id='navbar__profile_dropdown' className='navbar__buttons-dropdown_content scale-up-tr'>
            <a href="#">View Profile</a>
            <a href="#">Account</a>
            <a href="#">Settings</a>
            <a href="#">Logout</a>
          </div>
        </div>  
      </div>
    </div> 
  )
}
export default Header