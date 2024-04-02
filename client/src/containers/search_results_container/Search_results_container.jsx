import React, { useEffect, useState } from 'react';
import './search_results_container.css';
import { Post } from '../../components/index';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Search_results_container = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchInput = searchParams.get('search_input');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (searchInput) {
      axios.get(`http://localhost:4000/api/posts?search=${searchInput}`)
        .then(res => {
          setPosts(res.data); // Assuming the API returns only relevant posts
        }).catch(err => console.log(err));
    }
  }, [searchInput]); // useEffect will run when `searchInput` changes

  const Search_results = posts.slice(0, 10).map((content, index) =>
    <Post key={content._id} contents={content}></Post> // Ensure to have a key for each child in a list
  );

  return (
    <div className='search_results__container section__padding'>
      <h1>Showing results for: <span className='search_results__input'>{searchInput}</span> </h1>
      <div className='rectangleline'></div>
      <div className='search_results__contents'>
        {Search_results}
      </div>
    </div>
  );
}

export default Search_results_container;