import React, { useEffect, useState } from 'react'
import './aboutus_container.css';
//import {Post} from '../../components/index';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import {Post} from '../../components/index';
import aboutus_cover from '../../assets/images/csarch1cover.jpg';
import aboutus_picture from '../../assets/images/csarch1logo.png';


const Aboutus_container = ({user}) => {
  const {id} = useParams();
  const [posts,setPosts] = useState([])
  const [isJoined, setIsJoined] = useState(false);
  const [aboutusId, setAboutusId] = useState(null)
  //get all aboutuss joined by the user
  // useEffect(() => {
  //   if (user) {
  //     axios.get(`${process.env.REACT_APP_API_URL}/api/aboutuss/user/${user.username}`)
  //       .then(res => {
  //         // Assuming the response contains an array of aboutus objects
  //         const joinedAboutuss = res.data;
  //         const aboutus = joinedAboutuss.find(aboutus => aboutus.aboutus_name === id);
  //         if (aboutus) {
  //           setIsJoined(true);
  //         } else {
  //           setIsJoined(false);
  //         }
  //       })
  //       .catch(err => console.log(err));
  //   }
  // }, [id, user?.username]);
  
  const fetchJoined = () =>{
      if (user) {
        axios.get(`${process.env.REACT_APP_API_URL}/api/aboutuss/user/${user.username}`)
          .then(res => {
            // Assuming the response contains an array of aboutus objects
            const joinedAboutuss = res.data;
            const aboutus = joinedAboutuss.find(aboutus => aboutus.aboutus_name === id);
            if (aboutus) {
              setIsJoined(true);
            } else {
              setIsJoined(false);
            }
          })
          .catch(err => console.log(err));
      }
  }
  useEffect(() => {
    fetchJoined()
  }, [id, user?.username]);

  useEffect( () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/posts`)
      .then(res => {
        const filteredPosts = res.data.filter(post => 
          post.type === 'regular' && post.aboutus_id.name === String(id)
        );
        setPosts(filteredPosts);
      }).catch(err=> console.log(err));
  },[id]);

  useEffect( () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/aboutuss/${id}`)
      .then(res => {
        const { aboutus_id } = res.data;
        setAboutusId(aboutus_id);
      }).catch(err=> console.log(err));
  },[id]);

  const join = () => {
    const formData = {
      user_id: user._id,
      aboutus_id: aboutusId
    };
    console.log(formData);
    axios.post(`${process.env.REACT_APP_API_URL}/api/join_aboutus`, formData)
      .then(res => {
        console.log(res.data);
        fetchJoined();
      })
      .catch(err => console.log(err));
  };


  const Posts = posts.slice(0,10).map((content, index) => 
    <Post key={index} user={user} contents={content}></Post>
  );

  return (
    
      <div className='aboutus__container section__padding'>
      <div className='aboutus_header'>
        <div className="aboutus_header__cover-photo" style={{ backgroundImage: `url(${aboutus_cover})` }}></div>
        <div className="aboutus_header__profile-container">
        <div className="aboutus_header__aboutus-picture" style={{ backgroundImage: `url(${aboutus_picture})` }}></div>
          <div className="aboutus_header__profilecontainer">
            <div className="aboutus_header__aboutus-name">c/{id}</div>
            <button className="aboutus_header__right-button" disabled={!user} onClick={join} >
              {isJoined ? 'Joined' : 'Join'}
            </button>
          </div>
        </div>
      </div>
      <div className='topic__contents'>
        {Posts}
      </div>
    </div>
  )
}

export default Aboutus_container