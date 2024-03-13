import React from 'react'
import './create_post.css';

const Create_post = ({imgUrl, name, action}) => {
  return (
  <div className="create-post-container">
    <div className='form-group-row'>
    <div className="form-group-title">
      <h1 className='create-post-header'>Title</h1>
      <input type="text" className="title-input" placeholder="input title here" />
    </div>
    <div className="form-group-course">
      <h1 className='create-post-header'>Course</h1>
      <select className="course-select">
        <option>Course</option>
        <option>CCAPDEV</option>
        <option>CSMATH1</option>
        <option>CCPROG1</option>
      </select>
    </div>
    </div>
    <div className='form-group-column'>
    <h1 className='create-post-topic'>Choose topics (separated by comma)</h1>
      <div className="topic-input-container">
        <input type="text" className="topic-input" placeholder="input topics here" />
      </div>
      <textarea className="text-input" placeholder="Text"></textarea>
      <button className="post-button">Post</button>
    </div>
  </div>
  )
}

export default Create_post;