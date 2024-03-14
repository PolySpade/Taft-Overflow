import React from 'react'
import './post.css';
import {profile,dropdown, upvote_highlight,downvote_highlight,downvote_none,upvote_none} from './imports';
import study from '../../assets/images/study.jpg';

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


const Post = ({contents}) => {
  

  const title = contents.title;
  const content = contents.content;
  const date = formatDate(contents.entryDate);
  const course_id = contents.course_id.name;
  const username = contents.user_id.name;
  const profile_image = contents.user_id.profile_img;
  const type = contents.type;
  const topic_ids = contents.topic_ids;

  const query_tags = topic_ids.map((content, index) => 
    <a href={'/topics/'+content.name}>{'#'+content.name}</a>
  );



  return (
    <div className='post__container'>
      <div className='post__header'>
        <div className='post__footer'>
          <div className='post__footer-tags'>
            {query_tags}
          </div>
          <button className='post__footer-view'>
            <img src={dropdown}></img>
            <p>View more</p>
          </button>
          <div className='post__footer-date'>
            <p>{date}</p>
          </div>
        </div>

        <div className='post__profile'>
          <div className='post__profile-image'>
            <img src={profile} alt='profile'/>
          </div>
          <div className='post__profile-name'>
            <p>{username}</p>
          </div>
        </div>
        <div className='post__location'>
          <p>Posted in </p>
          <a href='#'>c/{course_id}</a>
        </div>
        <div className='post__votes'>
          <button class='post__votes-upvote'><img src={upvote_none} alt='upvote'></img></button>
          <p>123</p>
          <button class='post__votes-downvote'><img src={downvote_none} alt='downvote'></img></button>
          <p>123</p>
        </div>
      </div>
      <div className='post__content'>
        <p>{content}</p>
      </div>
    </div>

    
  )
}

export default Post