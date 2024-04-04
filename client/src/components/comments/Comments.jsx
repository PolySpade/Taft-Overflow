import React, {useState, useEffect} from 'react'
import './comments.css'
import {Link} from 'react-router-dom';
import axios from 'axios';
import delete_icon from '../../assets/icons/delete.svg';

const Comments = ({user,contents}) => {
  const [isOwner, setIsOwner] = useState(false);

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

  useEffect(() => {
    if(user){
       if(user.username === username || user.username === 'admin'){
         setIsOwner(true)
       }else{
         setIsOwner(false)
       }
    } 
   })

  // Safely access properties using optional chaining
  const comment_id = contents?._id;
  const user_id = contents?.user_id;
  const content = contents?.content;
  const date = contents ? formatDate(contents.entryDate) : 'Loading date...';
  const username = contents?.user_id.username;
  const profile_image = contents?.user_id.profile_img;
  //console.log(contents);
  //console.log(content);
  const handleDeleteComment = async() => {
    try{
      await axios.post(`${process.env.REACT_APP_API_URL}/api/comments/delete`, {
        comment_id: comment_id
      });
      alert("Comment Deleted!");
      window.location.reload(); 
    }catch(e){
      console.log(e);
    }
  }

  return(
  <div className="comment-box__container">
      <div className="comments-list">

        <div className="comment comment--root">
          <div className="comment__bar"></div>

          <div className="comment__header">
            <div className='comment__header-left_container'>
              <img className="comment__author-avatar" src={profile_image} alt="Profile Pic" />
              <Link to={'/profile/'+username}><span className="comment__author-name">{username}</span></Link>
              {isOwner && (<button className='post-header__edit-button'type="button" onClick={handleDeleteComment}><img src={delete_icon}></img></button>)}
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