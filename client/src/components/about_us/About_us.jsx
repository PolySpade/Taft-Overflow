import React from 'react';
import './about_us.css';

const About_us = ({ imgUrl, name, action }) => {
  return (
    <div className="about-us_container">
      <div>
        <h1>Our Story</h1>
        <p>We are a group of motivated students from De La Salle University, bonded by a shared vision to enhance the academic and social lives of our fellow Lasallians. Our journey began in the bustling corridors of our beloved university, where the idea of a dedicated forum for our community started to take shape. This idea blossomed into "Taft Overflow," a forum website meticulously crafted to cater to the unique needs of our university's students.</p>
        <br />
        <p>At Taft Overflow, we aim to create a vibrant online space where students from different colleges and courses can come together to share knowledge, discuss academic and extracurricular interests, and support each other in their university journey. Our platform is designed with the specific intent of fostering a sense of belonging and collaboration among the diverse student body of De La Salle University.</p>
        <br />
        <p>Driven by our commitment to enhancing student life and academic experience, Taft Overflow serves as a dynamic hub for information exchange, where students can find and share resources, advice, and insights related to their courses and college life. Our mission is to make every Lasallian feel connected, informed, and empowered through a forum that truly understands and addresses their needs.</p>
      </div>
      <div className="contact-us_container">
        <h1>Contact Us</h1>
        <p>Darylle Xander A. Calugtong<br />
        <a href="mailto:darylle_calugtong@dlsu.edu.ph">darylle_calugtong@dlsu.edu.ph</a><br />
        09176801021</p>
        <p>Carl Vincent Blix P. Lingat<br />
        <a href="mailto:carl_lingat@dlsu.edu.ph">carl_lingat@dlsu.edu.ph</a><br />
        09985491360</p>
        <p>Richmond Teri T. Tan<br />
        <a href="mailto:richmond_teri_tan@dlsu.edu.ph">richmond_teri_tan@dlsu.edu.ph</a><br />
        09171593960</p>
        <p>Donald G. Xu<br />
        <a href="mailto:xu_xu@dlsu.edu.ph">xu_xu@dlsu.edu.ph</a><br />
        09179919980</p>
      </div>
      <div className="npm-packages_container">
        <h1>NPM Packages</h1>
        <h2>Client side:</h2>
        <ul>
          <li>"@testing-library/jest-dom": "^5.17.0"</li>
          <li>"@testing-library/react": "^13.4.0"</li>
          <li>"@testing-library/user-event": "^13.5.0"</li>
          <li>"axios": "^1.6.7"</li>
          <li>"draft-js": "^0.11.7"</li>
          <li>"react": "^18.2.0"</li>
          <li>"react-dom": "^18.2.0"</li>
          <li>"react-icons": "^5.0.1"</li>
          <li>"react-router-dom": "^6.22.3"</li>
          <li>"react-scripts": "5.0.1"</li>
          <li>"web-vitals": "^2.1.4"</li>
        </ul>
        <h2>Server side:</h2>
        <ul>
          <li>"body-parser": "^1.20.2"</li>
          <li>"cors": "^2.8.5"</li>
          <li>"dotenv": "^16.4.5"</li>
          <li>"express": "^4.18.3"</li>
          <li>"express-fileupload": "^1.4.3"</li>
          <li>"hbs": "^4.2.0"</li>
          <li>"mongoose": "^8.2.1"</li>
          <li>"nodemon": "^3.1.0"</li>
        </ul>
      </div>
    </div>
  )
}

export default About_us;
