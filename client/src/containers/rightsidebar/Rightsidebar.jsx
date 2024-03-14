import React from 'react'
import './rightsidebar.css';
import {Sidebarsection} from '../../components';
import {announcement,recent,trend} from './imports';



const Rightsidebar = () => {
  return (
    <div className='rightsidebar__container section__padding'>
      <Sidebarsection header='Announcement' icon={announcement} />
      <Sidebarsection header='Hot Topics' icon={trend} />
      <Sidebarsection header='Recent Comments' icon={recent} />
    </div>
    
  )
}

export default Rightsidebar