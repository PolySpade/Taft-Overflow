import React, { useState } from 'react';
import { Post } from '../../components/index';
import announcement from '../../assets/icons/announcement.svg';
import icon from '../../assets/icons/profile-mini-icon.svg';
import upvote from '../../assets/icons/upvote.svg';
import downvote from '../../assets/icons/downvote.svg';
import arch1 from '../../assets/icons/csarch1cover.jpg';
import reply from '../../assets/icons/reply.svg';

const Comment = ({ comment, onReply }) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);

  const handleReply = () => {
    onReply(replyText, comment.id);
    setReplyText('');
    setShowReply(false);
  };

  const handleUpvote = () => {
    setUpvotes(upvotes + 1);
  };

  const handleDownvote = () => {
    setDownvotes(downvotes + 1);
  };

  return (
    <div className="comment comment--root">
      <div className="comment__bar"></div>

      <div className="comment__header">
        <img className="comment__author-avatar" src={icon} alt="Profile Pic" />
        <span className="comment__author-name">Dax</span> {/* Assuming the author is Dax */}
        <span className="comment__date">{new Date().toLocaleDateString()}</span> {/* Display current date */}
      
        <div className='comment__actions'>

          <div className='comment__vote-buttons'>
          <div className="vote-button">
              <button className="vote-button__action">
              <div className="reply-button__icon" onClick={() => setShowReply(!showReply)}>
    <img src={reply} alt="Reply" />
  </div>
              </button>
            </div>
            <div className="vote-button">
              <button className="vote-button__action" onClick={handleUpvote}>
                <img className="vote-button__icon" src={upvote} alt="Upvote" />
              </button>
              <span className="vote-button__count">{upvotes}</span>
            </div>
            <div className="vote-button">
              <button className="vote-button__action" onClick={handleDownvote}>
                <img className="vote-button__icon" src={downvote} alt="Downvote" />
              </button>
              <span className="vote-button__count">{downvotes}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="comment__content">{comment.text}</div>

      {comment.replies?.length > 0 && (
        <div className="comment__replies">
          {comment.replies.map(reply => (
            <Comment key={reply.id} comment={reply} onReply={onReply} />
          ))}
        </div>
      )}
      {showReply && (
        <div className="comment__reply">
          <textarea
            className="commentInputSmall"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
          />
          <button className="submit-reply" onClick={handleReply}>Reply</button>
        </div>
      )}
    </div>
  );
};

const addReply = (comments, parentId, newComment) => {
  return comments.map(comment => {
    if (comment.id === parentId) {
      return { ...comment, replies: [...comment.replies, newComment] };
    } else if (comment.replies) {
      return { ...comment, replies: addReply(comment.replies, parentId, newComment) };
    } else {
      return comment;
    }
  });
};

const CommentsSection = () => {
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');

  const postComment = (text, parentId = null) => {
    if (!text.trim()) {
      alert('Please enter a comment or reply.');
      return;
    }
    const comment = {
      id: Math.random().toString(36).substr(2, 9),
      author: 'Dax',
      text,
      replies: [],
    };

    if (parentId) {
      setComments(prevComments => addReply(prevComments, parentId, comment));
    } else {
      setComments(prevComments => [comment, ...prevComments]); // Reverse the order here
    }

    setNewCommentText('');
  };

  return (
    <div className="comments-section">
      <div className="comments-list">
        {comments.map(comment => (
          <Comment key={comment.id} comment={comment} onReply={postComment} />
        ))}
      </div>
      <div className="answer-header">
        <span>Your Answer</span>
      </div>
      <textarea
        className="commentInput"
        value={newCommentText}
        onChange={(e) => setNewCommentText(e.target.value)}
        placeholder="Write a comment..."
      />
      <button className="submit-button" onClick={() => postComment(newCommentText)}>Comment</button>
    </div>
  );
};

export default CommentsSection;
