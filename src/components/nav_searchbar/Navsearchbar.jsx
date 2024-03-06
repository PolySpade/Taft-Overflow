import React from 'react'
import './navsearchbar.css';
import Search from '../../assets/icons/FaSearch.svg'



const Navsearchbar = () => {
  return (
    <div className='searchbar'>
      <form name='search' action='/search-results?' method="GET" className='searchbar__form'>
        <button type='submit'><img src={Search} alt='Search Icon'/></button>
        <input type='text' placeholder='Search..' name='search_input'></input> 
      </form>
    </div>
  )
}

export default Navsearchbar