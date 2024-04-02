import React from 'react'
import './about_us_header.css';

const About_us_header = ({imgUrl, name, action}) => {
  return (
  <div className="title-container">
    <h2>About Us</h2>
    <div className="title-underline"></div>
  </div>
  )
}

export default About_us_header;