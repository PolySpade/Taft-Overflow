import React from 'react'
import './announcement_section.css';
import announcement from '../../assets/icons/announcement.svg';
import {Link} from 'react-router-dom';

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}


const Announcement_section = ({header,icon,contents}) => {
  
  const listItems = contents.slice(0,10).map((content, index) =>
    <li key={index}>
      <Link className='announcement_section__contents-header' to={'/posts/'+content._id}>{content.title}</Link>
      <p className='announcement_section__contents-content'>{content.content}</p>
      <p className='announcement_section__contents-date'>{formatDate(content.entryDate)}</p>
    </li>
  );
  return (
    <div className='announcement_section__container'>
      <div className='announcement_section__header'>
        <img src={icon}></img>
        <p>{header}</p>
      </div>
      <div className='announcement_section__contents'>
        {listItems}
      </div>
    </div>
  )
}

export default Announcement_section