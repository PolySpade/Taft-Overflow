import React from 'react'
import './post_full.css';
import study from '../../assets/images/study.jpg';
import {Link} from 'react-router-dom';
import icon from '../../assets/icons/profile-mini-icon.svg';
import upvote from '../../assets/icons/upvote.svg';
import downvote from '../../assets/icons/downvote.svg';
import arch1 from '../../assets/icons/csarch1cover.jpg';
import CommentsSection from './scripted';



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


const Post_full = ( {contents}) => {


  const post_full_id = contents._id;
  const title = contents.title;
  const content = contents.content;
  const date = formatDate(contents.entryDate);
  const course_id = contents.course_id.name;
  const username = contents.user_id.username;
  const profile_image = contents.user_id.profile_img;
  const type = contents.type;
  const topic_ids = contents.topic_ids;
  const query_tags = topic_ids.map((topic, index) => 
    <Link key={index} to={'/topics/'+ topic.name}>{'#'+ topic.name}</Link>
  );
  return (
    <div className="main_post__container">
    <div className="main_post__container-main-post">

    <div className="post-header">
      <img className="post-header__profile-pic" src={profile_image} alt="Profile Pic" />
      <div className="post-header__username">
        <Link to={'/profile/'+username}>{username}</Link>
        </div>
      <div className="post-header__course-page">
        <p>Posted in </p>
        <Link to={'/courses/'+course_id}>c/{course_id}</Link>
      </div>
      {/* <div className="post-header__vote-buttons">
        <div className="vote-button">
          <button className="vote-button__action">
            <img className="vote-button__icon" src={upvote} alt="Upvote" />
          </button>
          <span className="vote-button__count">30</span>
        </div>
        <div className="vote-button">
          <button className="vote-button__action">
            <img className="vote-button__icon" src={downvote} alt="Downvote" />
          </button>
          <span className="vote-button__count">10</span>
        </div>
      </div> */}
    </div>

    <div className="post_full__container">
      <div className="post__title">
        <span className="post__title-text">{title}</span>
      </div>

      <div className="post__content">
        {content}
      </div>

      <div className="post__tags">
        {query_tags}
      </div>
    </div>

    <div className="comment-box">
      <div id="your-answer">
        <CommentsSection />
      </div>
    </div>

  </div>
</div>

    
  )
}

export default Post_full