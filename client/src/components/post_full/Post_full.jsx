import React, { useEffect, useState }  from 'react'
import './post_full.css';
import {profile,dropdown, upvote_highlight,downvote_highlight,downvote_none,upvote_none} from './imports';
import {Link} from 'react-router-dom';
import CommentsSection from './scripted';
import axios from 'axios';
import icon from '../../assets/icons/profile-mini-icon.svg';
import reply from '../../assets/icons/reply.svg';

const delay = ms => new Promise(res => setTimeout(res, ms));

  // Wait for a specific time (e.g., 2000 milliseconds = 2 seconds)

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

const Comments = ({contents}) => {
  // Safely access properties using optional chaining
  const user_id = contents?.user_id;
  const parent_id = contents?.comment_id || contents?.post_id;
  const content = contents?.content;
  const date = contents ? formatDate(contents.entryDate) : 'Loading date...';
  const username = contents?.user_id.username;
  const profile_image = contents?.user_id.profile_img;

  const [upvote,setUpvote] = useState([])
  const [downvote,setDownvote] = useState([])
  const [comments, setComments] = useState([]);
  //TODO

  // const fetchVotes = () => {
  //   axios.get(`http://localhost:4000/api/vote/${parent_id}`)
  //     .then(res => {
  //       const { upvote, downvote } = res.data;
  //       setUpvote(upvote);
  //       setDownvote(downvote);
  //     })
  //     .catch(err => console.log(err));
  // };

  // useEffect(() => {
  //   fetchVotes();
  // }, [parent_id]);

  // const vote = (like_type) => {

  // let formData = {
  //     userId: user_id._id,
  //     voteType: like_type
  // };

  // // Add either commentId or postId to the formData based on the existence of comment_id
  // if (contents.comment_id) {
  //     formData.commentId = contents.comment_id;
  // } else {
  //     formData.postId = contents.post_id;
  // }
  //   //console.log(formData);
  //   axios.post(`http://localhost:4000/api/vote`, formData)
  //     .then(res => {
  //       //console.log(res.data);
  //       fetchVotes(); //refresh
  //     })
  //     .catch(err => console.log(err));
  // };
  
  // const handleUpvote = () => vote(1);
  // const handleDownvote = () => vote(-1);

  // //comments
  // const fetchComments = (id) => {
  //   axios.get(`http://localhost:4000/api/comments/${id}`)
  //   .then(res => {
  //     setComments(res.data);
  //   })
  //   .catch(err => console.log(err));
  // };

  // useEffect(() => {
  //   fetchComments(parent_id);
  // }, [parent_id]);

  // return(
  // <div className="comment-box__container">
  //     <div className="comments-list">

  //       <div className="comment comment--root">
  //         <div className="comment__bar"></div>

  //         <div className="comment__header">
  //           <div className='comment__header-left_container'>
  //             <img className="comment__author-avatar" src={icon} alt="Profile Pic" />
  //             <span className="comment__author-name">Dax</span>
  //             <span className="comment__date">Date</span>
  //           </div>
  //           <div className='comment__actions'>
  //             <div className='comment__vote-buttons'>
  //               <div className="vote-button">
  //                 <button className="vote-button__action">
  //                   <div className="reply-button__icon">
  //                     <img src={reply} alt="Reply" />
  //                   </div>
  //                 </button>
  //               </div>
  //               <div className="vote-button">
  //                 <button className="vote-button__action">
  //                   <img className="vote-button__icon" src={upvote_none} alt="Upvote" />
  //                 </button>
  //                 <span className="vote-button__count"></span>
  //               </div>
  //               <div className="vote-button">
  //                 <button className="vote-button__action">
  //                   <img className="vote-button__icon" src={downvote_none} alt="Downvote" />
  //                 </button>
  //                 <span className="vote-button__count"></span>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="comment__content">Comment text here</div>

  //         <div className="comment__replies">
  //         </div>
  //         <div className="comment__reply">
  //           <textarea
  //             className="commentInputSmall"
  //             placeholder="Write a reply..."
  //           />
  //           <div className='submit-reply__container'>
  //             <button className="submit-reply">Reply</button>
  //           </div>
  //         </div>
  //       </div>
  //     </div>


  //   </div>
  // )
};

const Post_full = ( {user,contents}) => {

  const user_id = contents.user_id;
  const post_id = contents._id;
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

  const [upvote,setUpvote] = useState([])
  const [downvote,setDownvote] = useState([])
  const [comments, setComments] = useState([]);

  const fetchVotes = () => {
    axios.get(`http://localhost:4000/api/vote/${post_id}`)
      .then(res => {
        const { upvote, downvote } = res.data;
        setUpvote(upvote);
        setDownvote(downvote);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchVotes();
  }, [post_id]);


  const vote = async (like_type) => {

    await delay(2000);
    const formData = {
      postId: post_id,
      userId: user_id._id,
      voteType: like_type
    };

    //console.log(formData);
    axios.post(`http://localhost:4000/api/vote`, formData)
      .then(res => {
        //console.log(res.data);
        fetchVotes(); //refresh
      })
      .catch(err => console.log(err));
  };
  
  const handleUpvote = () => vote(1);
  const handleDownvote = () => vote(-1);

  //comments
  const fetchComments =  async (id) => {
    await delay(2000);
    axios.get(`http://localhost:4000/api/comments/${id}`)
    .then(res => {
      setComments(res.data);
    })
    .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchComments(post_id);
  }, [post_id]);

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

      <div className="post-header__vote-buttons">
        <div className="vote-button">
          <button className="vote-button__action">
            <img className="vote-button__icon"  onClick={user && handleUpvote} src={upvote_none} alt="Upvote" />
          </button>
          <span className="vote-button__count">{upvote}</span>
        </div>
        <div className="vote-button">
          <button className="vote-button__action">
            <img className="vote-button__icon" onClick={user && handleDownvote} src={downvote_none} alt="Downvote" />
          </button>
          <span className="vote-button__count">{downvote}</span>
        </div>
      </div>
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
      <div className="post__date">{date}</div>
    </div>
    <Comments contents={comments[0]}></Comments>

    {user &&
          
            <div className="answer-box__container">
              <div className="answer-header">
                <span>Your Answer</span>
              </div>
              <textarea
                className="commentInput"
                placeholder="Write a comment..."
              />
              <div className='comments-submit-button__container'>
                <button className="submit-button">Comment</button>
              </div>
            </div>
          
    }
  </div>
</div>

    
  )
}

export default Post_full