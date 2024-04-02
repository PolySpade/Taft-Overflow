import React from 'react';
import './privacy_policy.css';

const About_us = ({ imgUrl, name, action }) => {
  return (
    <div className="privacy-policy_container">
      <div>
        <h1>Policy</h1>
        <p>
          This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
        </p>
        <br></br>
        <p>
          We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
        </p>
        <br></br>
        <h1>Information Collection and Use</h1>
        <p>
          We collect several different types of information for various purposes to provide and improve our Service to you.
        </p>
        <br></br>
        <h1>Types of Data Collected Personal Data</h1>
        <p>
          While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:
        </p>
        <br></br>
        <p>
          Email address<br></br>
          First name and last name<br></br>
          DLSU Email Address<br></br>
          ID Number<br></br>
          Degree<br></br>
        </p>
      </div>
    </div>
  )
}

export default About_us;
