import React from 'react';
import './body.css';
import icon from '../../assets/icons/profile-mini-icon.svg';
import upvote from '../../assets/icons/upvote.svg';
import downvote from '../../assets/icons/downvote.svg';
import arch1 from '../../assets/icons/csarch1cover.jpg';
import CommentsSection from './scripted';

const Body = () => {
  return (
<div class="body__container section__padding">
  <div class="body__container-main-post">

    <div class="post-header">
      <img class="post-header__profile-pic" src={icon} alt="Profile Pic" />
      <div class="post-header__username">AtorniPulpul</div>
      <div class="post-header__course-page">
        Posted in <span class="post-header__course-name">c/CCPROG3</span>
      </div>
      <div class="post-header__vote-buttons">
        <div class="vote-button">
          <button class="vote-button__action">
            <img class="vote-button__icon" src={upvote} alt="Upvote" />
          </button>
          <span class="vote-button__count">30</span>
        </div>
        <div class="vote-button">
          <button class="vote-button__action">
            <img class="vote-button__icon" src={downvote} alt="Downvote" />
          </button>
          <span class="vote-button__count">10</span>
        </div>
      </div>
    </div>

    <div class="post">
      <div class="post__title">
        <span class="post__title-text">PROF TO PICK FOR CCAPDEV</span>
      </div>

      <div class="post__content">
        Who is a good prof for CCAPDEV?
      </div>

      <div class="post__image">
        <img class="post__image-content" src={arch1} alt="Post Image" />
      </div>

      <div class="post__tags">
        #prof #id122 #ccapdev
      </div>
    </div>

    <div class="comment-box">
      <div id="your-answer">
        <CommentsSection />
      </div>
    </div>

  </div>
</div>


  );
}

export default Body;
