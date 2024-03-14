import React from 'react';
import './body.css';
import { Post } from '../../components/index';
import course_cover from '../../assets/images/csarch1cover.jpg';
import course_picture from '../../assets/images/csarch1logo.png';

const Body = () => {
  return (
    <div className='body__container section__padding'>
      <div className='header'>
        <div className="header__cover-photo" style={{ backgroundImage: `url(${course_cover})` }}></div>
        <div className="header__profile-container">
        <div className="header__course-picture" style={{ backgroundImage: `url(${course_picture})` }}></div>
          <div className="header__profilecontainer">
            <div className="header__course-name">c/CSARCH1</div>
            <button className="header__right-button">Join</button>
          </div>
        </div>
      </div>
      <Post></Post>
    </div>
  );
}


export default Body;
