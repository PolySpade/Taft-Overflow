import React from 'react'

import { Search_results_container,Leftsidebar,Rightsidebar } from '../../containers';

import './search_results.css';

const Search_results = () => {
  return (
    <div className="search_results__container-body">
      <Leftsidebar />
      <Search_results_container />
      <Rightsidebar />
    </div>
  )
}

export default Search_results