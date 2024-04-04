import React from 'react'
import './comments.css'
import {Link} from 'react-router-dom';
import axios from 'axios';

const Comments = ({contents}) => {
  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  // Safely access properties using optional chaining
  const user_id = contents?.user_id;
  const content = contents?.content;
  const date = contents ? formatDate(contents.entryDate) : 'Loading date...';
  const username = contents?.user_id.username;
  const profile_image = contents?.user_id.profile_img;
  //console.log(contents);
  //console.log(content);
  return(
  <div className="comment-box__container">
      <div className="comments-list">

        <div className="comment comment--root">
          <div className="comment__bar"></div>

          <div className="comment__header">
            <div className='comment__header-left_container'>
              <img className="comment__author-avatar" src={profile_image} alt="Profile Pic" />
              <Link to={'/profile/'+username}><span className="comment__author-name">{username}</span></Link>
              
            </div>
          </div>
          <div className="comment__content">{content}</div>
          <span className="comment__date">{date}</span>
        </div>
      </div>


    </div>
  )
};

export default Comments