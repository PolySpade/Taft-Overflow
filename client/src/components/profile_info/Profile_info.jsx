import React from 'react'
import './profile_info.css';

const Profile_info = ({imgUrl, name, action}) => {
  return (
    <div className='profile_info__container'>
      <div className='profile_info__image'>
        <img src=''></img>
      </div>
      <div className='profile_info__textcontainer'>
      <div className='profile_info__details'>
        <div className='profile_info__details-contents'>
          <p className='profile_info__details-contents_header'>Username</p>
          <p className='profile_info__details-contents_text'>IceSpade</p>
        </div>
        <div className='profile_info__details-contents'>
          <p className='profile_info__details-contents_header'>Degree</p>
          <p className='profile_info__details-contents_text'>BS CS-ST</p>
        </div>
        <div className='profile_info__details-contents'>
          <p className='profile_info__details-contents_header'>ID Number</p>
          <p className='profile_info__details-contents_text'>122</p>
        </div>
      </div>
      <div className='profile_info__aboutme'>
        <p className='profile_info__aboutme-header'>About Me:</p>
        <p className='profile_info__aboutme-text'>Hi, I am a second year college student in De La Salle University studying Bachelor of Science in Computer Science Major in Software Technology. Some of my hobbies are playing video games, cooking, and eating.</p>
      </div>
      </div>
    </div>
  )
}

export default Profile_info