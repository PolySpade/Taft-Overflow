import React from 'react'
import './sidebardropdown.css';
import dropdown from '../../assets/icons/dropdown.svg';


function clickMenu(id) {
  document.getElementById(id).classList.toggle("show");
}

const Sidebardropdown = ({title,contents,tag}) => {
  const listItems = contents.map(content =>
    <li><a href={tag + content}>{tag + content}</a></li>
  );
  return (
    <div className='sidebardropdown'>
      <button onClick={() => clickMenu(title)} className='sidebardropdown__button'>
        <p>{title}</p>
        <img src={dropdown} alt='dropdown'/>
      </button>
      <ul className='sidebardropdown__list'>
        <div id={title} className='sidebardropdown__list-contents fade-in'>
          {listItems}
        </div>
      </ul>

    </div>
  )
}

export default Sidebardropdown