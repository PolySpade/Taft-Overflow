import React from 'react'
import './profile_info.css';
import profile from '../../assets/images/default_profile.jpg';

const Profile_info = ({contents}) => {

  const username = contents.username;
  const degree = contents.degree;
  const school_id = contents.school_id;
  const aboutme = contents.aboutme;

  // username: 'IceSpade',
  // name: 'Donald Xu',
  // email: 'xu_xu@dlsu.edu.ph',
  // school_id: 12210269,
  // degree: 'CS-ST',
  // aboutme: 'A ccs student'

  return (
    <div className='profile_info__container'>
      <div className='profile_info__image'>
        <img src={profile} alt='icespadepfp'></img>
      </div>
      <div className='profile_info__textcontainer'>
      <div className='profile_info__details'>
        <div className='profile_info__details-contents'>
          <p className='profile_info__details-contents_header'>Username</p>
          <p className='profile_info__details-contents_text'>{username}</p>
        </div>
        <div className='profile_info__details-contents'>
          <p className='profile_info__details-contents_header'>Degree</p>
        <p className='profile_info__details-contents_text'>{degree}</p>
        </div>
        <div className='profile_info__details-contents'>
          <p className='profile_info__details-contents_header'>ID Number</p>
          <p className='profile_info__details-contents_text'>{school_id}</p>
        </div>
      </div>
      <div className='profile_info__aboutme'>
        <p className='profile_info__aboutme-header'>About Me:</p>
        <p className='profile_info__aboutme-text'>{aboutme}</p>
      </div>
      </div>
    </div>
  )
}

export default Profile_info