import React from 'react'
import {Create_course} from '../../components/index';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom'
import './create_course_container.css';

const Create_course_container = ({user}) => {
  return (
    <div className='create_course_container__container section__padding'>
        <div className='create_course_container__header'>
        <h1>Create Course</h1>
        </div>
        <div className='rectangleline'></div>
        <Create_course user={user}/>
    </div>
  )
}

export default Create_course_container