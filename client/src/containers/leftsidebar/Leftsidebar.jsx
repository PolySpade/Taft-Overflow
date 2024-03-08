import React, { useEffect, useState } from 'react'
import './leftsidebar.css';
import {Sidebarbigbuttons, Sidebardropdown} from '../../components';
import axios from 'axios';
import {home,fire,bookmark} from './imports';


const Leftsidebar = () => {
  const [topics,setTopics] = useState([]);
  const [courses,setCourses] = useState([]);



  useEffect( () => {
    axios.get("http://localhost:4000/api/topics")
      .then(res => {
        setTopics(res.data)
      })
      .catch(err => console.log(err));
  },[]);


  useEffect( () => {
    axios.get("http://localhost:4000/api/courses")
      .then(res => {
        setCourses(res.data)
      })
      .catch(err => console.log(err));
  },[]);


  /*
  const topics__contents = topics.slice(0,10).map(topic => topic.name);
  const courses__contents = courses.slice(0,10).map(course => course.name);
  */


  return (
    <div className='leftsidebar__container section__padding'>
      <Sidebarbigbuttons imgUrl={home} name='Home' action={'n/a'}/>
      <Sidebarbigbuttons imgUrl={fire} name='Popular' action={'n/a'}/>
      <Sidebarbigbuttons imgUrl={bookmark} name='Bookmarks' action={'n/a'}/>
      <Sidebardropdown title='Topics' contents={topics} tag='#'></Sidebardropdown>
      <div className='rectangleline'></div>
      <Sidebardropdown title='Courses' contents={courses} tag='cc/'></Sidebardropdown>
    </div>
  )
}

export default Leftsidebar