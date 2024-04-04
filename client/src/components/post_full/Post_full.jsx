import React, { useEffect, useState }  from 'react'
import './post_full.css';
import {profile,dropdown, upvote_highlight,downvote_highlight,downvote_none,upvote_none,pencil_fill,delete_icon} from './imports';
import {Link, useNavigate} from 'react-router-dom';
import {Comments} from '../index';
import axios from 'axios';

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



const Post_full = ( {user,contents}) => {
  const navigate = useNavigate();
  const post_id = contents._id;
  const date = formatDate(contents.entryDate);
  const course_id = contents.course_id.name;
  const username = contents.user_id.username;
  const profile_image = contents.user_id.profile_img;
  const type = contents.type;
  const topic_ids = contents.topic_ids;
  const query_tags = topic_ids.map((topic, index) => 
    <Link key={index} to={'/topics/'+ topic.name}>{'#'+ topic.name}</Link>
  );
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);
  const [upvote,setUpvote] = useState([]);
  const [downvote,setDownvote] = useState([]);
  const [comments, setComments] = useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(contents.title);
  const [editedContent, setEditedContent] = useState(contents.content);

  const editContent = () => {
    setTitle(contents.title);
    setContent(contents.content);
  }

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
    editContent();
  }, [post_id]);



  const vote = async (like_type) => {

    const formData = {
      postId: post_id,
      userId: user._id,
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

  const resetForm = () => {
    const element = document.getElementsByName('commentInput')[0];
    if (element) {
        element.value = '';
    }
};
  //comments
  const fetchComments = async (id) => {
    console.log(`Fetching comments for post ${id}`); 
    try {
      const response = await axios.get(`http://localhost:4000/api/comments/${id}`);
      if (response.data) {

        setComments(response.data);
      } else {
        console.log('No comments data received'); 
      }
    } catch (err) {
      console.error('Error fetching comments:', err); 
    }
  };

  useEffect(() => {
    fetchComments(post_id);
  }, [post_id]);

  const listItems = comments.map((content, index) => (
    <Comments user={user} key={index} contents={content}/>
  )
  );

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const commentInput = e.target.commentInput.value; 

    if (!commentInput) {
      alert('No comment to submit'); // Or handle this case appropriately
      return;
    }

    try {
      const response = await axios.post(`http://localhost:4000/api/comments`, {
        post_id: post_id,
        user_id: user._id,
        content: commentInput,
      });
      //console.log('Comment submitted:', response.data);
      fetchComments(post_id);
      resetForm();
    } catch (err) {
      console.error('Error submitting comment:', err);
    }
  };

  useEffect(() => {
   if(user){
      if(user.username === username || user.username === 'admin'){
        setIsOwner(true)
      }else{
        setIsOwner(false)
      }
   } 
  })


  const handleEdit = () => {
    setEditMode(true);
  };

  const handleDeletePost = async() => {
    try{
      await axios.post(`http://localhost:4000/api/posts/delete`, {
        post_id: post_id
      });
      alert("Post Deleted!");
      navigate('/home');
    }catch(e){
      console.log(e);
    }
  }

  const saveEdits = async () => {
    try {
      await axios.post(`http://localhost:4000/api/posts/update`, {
        title: editedTitle,
        content: editedContent,
        post_id: post_id
      });
      //console.log(response);

      setEditMode(false);
      contents.title=editedTitle;
      contents.content=editedContent;
      editContent();
      //window.location.reload();
    } catch (err) {
      console.error('Error updating post:', err);
    }
  };


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

      {isOwner && (<button className='post-header__edit-button'type="button" onClick={handleEdit}><img src={pencil_fill}></img></button>)}
      {isOwner && (<button className='post-header__edit-button'type="button" onClick={handleDeletePost}><img src={delete_icon}></img></button>)}
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
      {editMode ? (
          <div>
            <div className="post__edit_headers">Title</div>
            <input 
            className='edit_textInput'
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <div className="post__edit_headers">Contents</div>
            <textarea
            className='edit_commentInput'
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <button className="post__edit_buttons" onClick={saveEdits}>Save</button>
            <button className="post__edit_buttons" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        ) : (
          <div>
            <div className="post__title"><span className="post__title-text">{title}</span></div>
            <div className="post__content">{content}</div>
          </div>
        )}
      {/* <div className="post__title">
        <span className="post__title-text">{title}</span>
      </div>

      <div className="post__content">
        {content}
      </div> */}
      
      <div className="post__tags">
        
        {query_tags}
      </div>
      <div className="post__date">{date}</div>
    </div>
    {listItems}
    {user &&
          
          <div className="answer-box__container">
          <form onSubmit={handleSubmit}>
            <div className="answer-header">
              <span>Your Answer</span>
            </div>
            <textarea
              name="commentInput"
              className="commentInput"
              placeholder="Write a comment..."
            />
            <div className='comments-submit-button__container'>
              <button type="submit" className="submit-button">Comment</button>
            </div>
          </form>
        </div>
          
    }
  </div>
</div>

    
  )
}

export default Post_full