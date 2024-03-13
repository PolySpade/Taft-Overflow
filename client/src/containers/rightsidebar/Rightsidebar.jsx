import React from 'react'
import './rightsidebar.css';
import {Sidebarsection} from '../../components';
import {Sidebarrules} from '../../components';
import {Sidebarmembers} from '../../components';

const Rightsidebar = () => {
  return (
    <div className='rightsidebar__container section__padding'>
      <Sidebarsection/>
      <Sidebarrules />
      <Sidebarmembers />
    </div>
    
  )
}

export default Rightsidebar