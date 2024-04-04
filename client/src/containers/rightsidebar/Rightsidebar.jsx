import React, { useEffect, useState} from 'react'
import './rightsidebar.css';
import {Sidebarsection,Announcement_section} from '../../components';
import {announcement,recent,trend} from './imports';
import axios from 'axios';
import Hottopics_section from '../../components/hottopics_section/Hottopics_section';


const Rightsidebar = () => {
  const [announcements,setAnnouncements] = useState([]);
  const [topics,setTopics] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/api/posts")
      .then(res => {
        const sortedAnnouncements = res.data
          .filter(post => post.type === 'announcement')
          .sort((a, b) => new Date(b.entryDate) - new Date(a.entryDate)); // Sort announcements by date descending
        setAnnouncements(sortedAnnouncements);
      })
      .catch(err => console.log(err));
  }, []);

  // useEffect( () => {
  //   axios.get("http://localhost:4000/api/topics")
  //     .then(res => {
  //       setTopics(res.data)
  //     })
  //     .catch(err => console.log(err));
  // },[]);


  return (
    <div className='rightsidebar__container section__padding'>
      <Announcement_section header='Announcement' icon={announcement} contents={announcements}/>
      {/* <Hottopics_section header='Hot Topics' icon={trend} contents={topics} /> */}
      {/* <Sidebarsection header='Recent Comments' icon={recent} /> */}
    </div>
    
  )
}

export default Rightsidebar