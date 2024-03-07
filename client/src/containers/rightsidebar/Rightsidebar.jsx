import React from 'react'
import './rightsidebar.css';
import {Sidebarsection} from '../../components';


const Rightsidebar = () => {
  return (
    <div className='rightsidebar__container section__padding'>
      <Sidebarsection />
      <Sidebarsection />
      <Sidebarsection />
    </div>
    
  )
}

export default Rightsidebar