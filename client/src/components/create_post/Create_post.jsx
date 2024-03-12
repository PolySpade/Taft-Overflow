import React from 'react'
import './create_post.css';

const Create_post = ({imgUrl, name, action}) => {
  return (
  <div className="create-post-container">
    <div className="form-group">
      <input type="text" className="title-input" placeholder="Title" />
      <select className="course-select">
        <option>Course</option>
      </select>
      <div className="topic-input-container">
        <input type="text" className="topic-input" placeholder="Choose topics (separated by comma)" />
      </div>
      <textarea className="text-input" placeholder="Text"></textarea>
      <button className="post-button">Post</button>
    </div>
  </div>
  )
}

export default Create_post;