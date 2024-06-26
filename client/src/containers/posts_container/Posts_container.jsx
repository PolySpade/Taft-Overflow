import React, { useEffect, useState } from 'react';
import './posts_container.css';
import { Post } from '../../components/index';
import axios from 'axios';

const PostsPerPage = 10; 

const Posts_container = ({user}) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/posts`)
      .then(res => {
        const regularPosts = res.data.filter(post => post.type === 'regular').sort((a, b) => new Date(b.entryDate) - new Date(a.entryDate));
        setPosts(regularPosts);
        setTotalPages(Math.ceil(regularPosts.length / PostsPerPage));
      }).catch(err => console.log(err));
  }, []);

  
  const indexOfLastPost = currentPage * PostsPerPage;
  const indexOfFirstPost = indexOfLastPost - PostsPerPage;
  //console.log(indexOfFirstPost + ' ' + indexOfLastPost);
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const Posts = currentPosts.map((content, index) =>
    <Post user={user} key={index} contents={content}></Post>
  );

  return (
    <div className='posts__container section__padding'>
      {Posts}
      <div className="posts__pagination">
        {currentPage > 1 && (
          <button onClick={() => paginate(currentPage - 1)}>Prev</button>
        )}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
          <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
            {number}
          </button>
        ))}
        {currentPage < totalPages && (
          <button onClick={() => paginate(currentPage + 1)}>Next</button>
        )}
      </div>
    </div>
  );
}

export default Posts_container;