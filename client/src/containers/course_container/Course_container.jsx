import React, { useEffect, useState } from 'react'
import './course_container.css';
//import {Post} from '../../components/index';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom'
import {Post} from '../../components/index';
import course_cover from '../../assets/images/csarch1cover.jpg';
import course_picture from '../../assets/images/csarch1logo.png';


const Course_container = () => {
  const {id} = useParams();
  const [posts,setPosts] = useState([])

  useEffect( () => {
    axios.get("http://localhost:4000/api/posts")
      .then(res => {
        const filteredPosts = res.data.filter(post => 
          post.type === 'regular' && post.course_id.name === String(id)
        );
        setPosts(filteredPosts);
      }).catch(err=> console.log(err));
  },[id]);
  
  //console.log(posts[0].course_id.name);


  const Posts = posts.slice(0,10).map((content, index) => 
    <Post contents={content}></Post>
  );

  return (
    
      <div className='course__container section__padding'>
      <div className='course_header'>
        <div className="course_header__cover-photo" style={{ backgroundImage: `url(${course_cover})` }}></div>
        <div className="course_header__profile-container">
        <div className="course_header__course-picture" style={{ backgroundImage: `url(${course_picture})` }}></div>
          <div className="course_header__profilecontainer">
            <div className="course_header__course-name">c/{id}</div>
            <button className="course_header__right-button">Join</button>
          </div>
        </div>
      </div>
      <div className='topic__contents'>
        {Posts}
      </div>
    </div>
  )
}

export default Course_container