import React from 'react'
import './hottopics_section.css';
import announcement from '../../assets/icons/announcement.svg';
import {Link} from 'react-router-dom';


const Hottopics_section = ({header,icon,contents}) => {

  const listItems = contents.slice(0,6).map((content, index) =>
    <Link className='hottopics_section__contents-content' to={'/topics/'+content.name}>{'#'+content.name}</Link>
  );
  return (
    <div className='hottopics_section__container'>
      <div className='hottopics_section__header'>
        <img src={icon}></img>
        <p>{header}</p>
      </div>
      <div className='hottopics_section__contents'>
        {listItems}
      </div>
    </div>
  )
}

export default Hottopics_section