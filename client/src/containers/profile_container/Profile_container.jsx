import React, { useEffect, useState } from 'react';
import './profile_container.css';
import { Profile_recents, Profile_info } from '../../components/index';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom'

const Profile_container = ({user}) => {
  const {id} = useParams();
  const [userr,setUser] = useState([])

  useEffect( () => {
    axios.get("http://localhost:4000/api/users")
      .then(res => {
        const filteredUser = res.data.filter(item => item.username === id);
        setUser(filteredUser);
      }).catch(err=> console.log(err));
  },[id]);

  return (
    <div className='profile_container__container section__padding'>
      {userr[0] && <Profile_info contents={userr[0]} />}
      <div className='profile_container__recents'>
        <Profile_recents user={user} id={id}></Profile_recents>
      </div>
    </div>
  );
}

export default Profile_container;