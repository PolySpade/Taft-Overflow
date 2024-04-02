import React, { useEffect, useState } from 'react'
import './search_results_container.css';
import {Post} from '../../components/index';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom'


const Search_results_container = () => {

  const {id} = useParams();
  const [post,setPosts] = useState([])

  useEffect( () => {
    axios.get("http://localhost:4000/api/posts")
      .then(res => {
        setPosts(res.data.filter(post => post.type === 'regular'))
      }).catch(err=> console.log(err));
  },[]);

  const Search_results = post.slice(0,10).map((content, index) =>
    <Post contents={content}></Post>
  );

  return (
    <div className='search_results__container section__padding'>
      <h1>Search_results</h1>
      <div className='rectangleline'></div>
      <div className='search_results__contents'>
      {Search_results}
      </div>
    </div>
  )
}

export default Search_results_container