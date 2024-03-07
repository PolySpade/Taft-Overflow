import React from 'react'
import './leftsidebar.css';
import {Sidebarbigbuttons, Sidebardropdown} from '../../components';
import {home,fire,bookmark} from './imports';

const topic__contents = [
    'id122','id123'
];

const courses__contents = [
  'CCPROG','CCAPDEV','CSARCH'
]

const Leftsidebar = () => {
  return (
    <div className='leftsidebar__container section__padding'>
      <Sidebarbigbuttons imgUrl={home} name='Home' action={'n/a'}/>
      <Sidebarbigbuttons imgUrl={fire} name='Popular' action={'n/a'}/>
      <Sidebarbigbuttons imgUrl={bookmark} name='Bookmarks' action={'n/a'}/>
      <Sidebardropdown title='Topics' contents={topic__contents} tag='#'></Sidebardropdown>
      <div className='rectangleline'></div>
      <Sidebardropdown title='Courses' contents={courses__contents} tag='cc/'></Sidebardropdown>
    </div>
  )
}

export default Leftsidebar