import React, { useEffect, useState } from 'react';
import './profile_container.css';
import { Profile_recents, Profile_info } from '../../components/index';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom'

const Profile_container = () => {
  const {id} = useParams();
  const [user,setUser] = useState([])

  useEffect( () => {
    axios.get("http://localhost:4000/api/users")
      .then(res => {
        const filteredUser = res.data.filter(item => item.username === id);
        setUser(filteredUser);
      }).catch(err=> console.log(err));
  },[id]);

  return (
    <div className='profile_container__container section__padding'>
      {user[0] && <Profile_info contents={user[0]} />}
      {/* <div className='profile_container__recents'>
        <Profile_recents></Profile_recents>
        <Profile_recents></Profile_recents>
      </div> */}
    </div>
  );
}

export default Profile_container;