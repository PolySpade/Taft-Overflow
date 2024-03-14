import React, { useEffect, useState } from 'react'
import './topics_container.css';
//import {Post} from '../../components/index';
import axios from 'axios';
import {Link} from 'react-router-dom'


const Topics_container = () => {

  const [topics,setTopics] = useState([])

  useEffect( () => {
    axios.get("http://localhost:4000/api/topics")
      .then(res => setTopics(res.data)
      ).catch(err=> console.log(err));
  },[]);

  // const Topics = posts.slice(0,2).map((content, index) =>
  //   <Post contents={content}></Post>
  // );
  
  const Topics = topics.map((content, index) => 
    <Link to={'/topics/'+content.name}>{'#'+content.name}</Link>
  );

  return (
    <div className='topics__container section__padding'>
      <h1>Topics </h1>
      <div className='rectangleline'></div>
      {Topics}
    </div>
  )
}

export default Topics_container