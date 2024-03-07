import React from 'react'
import './post.css';
import {profile,dropdown, upvote_highlight,downvote_highlight,downvote_none,upvote_none} from './imports';
import study from '../../assets/images/study.jpg';

const Post = ({post_contents}) => {
  return (
    <div className='post__container'>
      <div className='post__header'>
        <div className='post__footer'>
          <div className='post__footer-tags'>
            <a href='#'>#id122</a>
            <a href='#'>#id123</a>
          </div>
          <button className='post__footer-view'>
            <img src={dropdown}></img>
            <p>View more</p>
          </button>
          <div className='post__footer-date'>
            <p>12/2/2024</p>
          </div>
        </div>

        <div className='post__profile'>
          <div className='post__profile-image'>
            <img src={profile} alt='profile'/>
          </div>
          <div className='post__profile-name'>
            <p>AtorniPulpul</p>
          </div>
        </div>
        <div className='post__location'>
          <p>Posted in </p>
          <a href='#'>c/CCPROG</a>
        </div>
        <div className='post__votes'>
          <button class='post__votes-upvote'><img src={upvote_none} alt='upvote'></img></button>
          <p>123</p>
          <button class='post__votes-downvote'><img src={downvote_none} alt='downvote'></img></button>
          <p>123</p>
        </div>
      </div>
      <div className='post__content'>
        <p>Test</p>
        <img src={study} alt='Studying'></img>
      </div>
    </div>

    
  )
}

export default Post