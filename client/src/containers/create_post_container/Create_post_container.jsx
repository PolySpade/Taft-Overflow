import React from 'react'
import {Create_post} from '../../components/index';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom'
import './create_post_container.css';

const Create_post_container = ({user}) => {
  return (
    <div className='create_post_container__container section__padding'>
        <div className='create_post_container__header'>
        <h1>Create Post</h1>
        </div>
        <div className='rectangleline'></div>
        <Create_post user={user}/>
    </div>
  )
}

export default Create_post_container