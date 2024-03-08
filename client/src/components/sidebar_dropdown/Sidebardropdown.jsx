import React from 'react'
import './sidebardropdown.css';
import dropdown from '../../assets/icons/dropdown.svg';


function clickMenu(id) {
  document.getElementById(id).classList.toggle("show");
}

const Sidebardropdown = ({title,contents,tag}) => {
  const listItems = contents.slice(0,10).map((content, index) =>
    <li key={index}><a href={tag+content.name}>{tag+content.name}</a></li>
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