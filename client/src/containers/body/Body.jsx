import React from 'react'
import './body.css';
import {Post} from '../../components/index';


const Body = () => {
  return (
    <div className='body__container section__padding'>
      <div className='header'>
        <div class="cover-photoappdev"></div>
        <div class="profile-container">
            <div class="profile-pictureappdev"></div>
            <div class="profilecontainer">
            <div class="course-name">c/CSARCH1</div>
            <button class="right-button">Join</button>
            </div>
        </div>
    </div>
    <Post></Post>
  </div>
  )
}

export default Body