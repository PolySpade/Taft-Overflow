import React from 'react'
import './post_mini.css';
import {profile,dropdown, upvote_highlight,downvote_highlight,downvote_none,upvote_none} from './imports';
import study from '../../assets/images/study.jpg';
import {Link} from 'react-router-dom';

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


const Post_mini = ({contents}) => {
  
  const post_id = contents._id;
  const title = contents.title;
  const content = contents.content;
  const date = formatDate(contents.entryDate);
  const course_ids = contents.course_id;
  const username = contents.user_id.username;
  const profile_image = contents.user_id.profile_img;
  const type = contents.type;
  const topic_ids = contents.topic_ids;

  const query_tags = topic_ids.map((content, index) => 
    <Link key={index} to={'/topics/'+content.name}>{'#'+content.name}</Link>
  );



  return (
    <div className='post_mini__container'>
      <div className='post_mini__header'>
        <div className='post_mini__footer'>
          <div className='post_mini__footer-tags'>
            {query_tags}
          </div>
          <Link className='post_mini__footer-view' to={'/posts/'+ post_id}>
            <img src={dropdown}></img>
            <p>View more</p>
          </Link>
          <div className='post_mini__footer-date'>
            <p>{date}</p>
          </div>
        </div>

        <div className='post_mini__profile'>
          <div className='post_mini__profile-image'>
            <img src={profile} alt='profile'/>
          </div>
          <div className='post_mini__profile-name'>
            <p>{username}</p>
          </div>
        </div>
        <div className='post_mini__location'>
          <p>Posted in </p>
          <Link to={'/courses/'+ course_ids.name}>c/{course_ids.name}</Link>
        </div>
        <div className='post_mini__votes'>
          <button class='post_mini__votes-upvote'><img src={upvote_none} alt='upvote'></img></button>
          <p>123</p>
          <button class='post_mini__votes-downvote'><img src={downvote_none} alt='downvote'></img></button>
          <p>123</p>
        </div>
      </div>
      <div className='post_mini__content'>
        <p>{content}</p>
      </div>
    </div>

    
  )
}

export default Post_mini