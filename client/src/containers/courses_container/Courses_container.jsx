import React, { useEffect, useState } from 'react'
import './courses_container.css';
//import {Post} from '../../components/index';
import axios from 'axios';
import {Link} from 'react-router-dom'


const Courses_container = () => {

  const [courses,setCourses] = useState([])

  useEffect( () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/courses`)
      .then(res => setCourses(res.data)
      ).catch(err=> console.log(err));
  },[]);
  
  const Courses = courses.map((content, index) => 
    <Link to={'/courses/'+content.name}>{'c/'+content.name}</Link>
  );

  return (
    <div className='courses__container section__padding'>
      <h1>Courses </h1>
      <div className='rectangleline'></div>
      {Courses}
    </div>
  )
}

export default Courses_container