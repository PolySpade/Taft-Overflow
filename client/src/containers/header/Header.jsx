import { useState, useEffect, React} from 'react'
import './header.css';
import { Navsearchbar } from '../../components/';
import { logo_full,menu,messages,notifications,profile,createpost } from './imports';
import { Link } from "react-router-dom";
import axios from 'axios';

axios.defaults.withCredentials = true;


function clickMenu(id) {
    document.getElementById(id).classList.toggle("show");
}



const Header = ( {user, logout}) => {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   axios.get('http://localhost:4000/api/current_user')
  //     .then(response => {
  //       const { username, _id } = response.data;
  //       setUser({ username, _id }); // Assuming you want to store both
  //     })
  //     .catch(error => {
  //       console.error('Error fetching user:', error);
  //     });
  // }, []);

  // const handleLogout = () => {
  //   axios.get('http://localhost:4000/api/logout')
  //     .then(() => {
  //       setUser(null);
  //     })
  //     .catch(error => {
  //       console.error('Logout error:', error);
  //     });
  // };


  return (
    <div className="navbar section__padding">
      
      <div className="navbar__logo">
        <Link to='/'>
        <img src={logo_full}></img>
        </Link>
      </div>
      
      <div className="navbar__search">
        <Navsearchbar></Navsearchbar>
      </div>
      <div className="navbar__buttons">
        <div className='navbar__buttons-dropdown'>
          <button type="button" onClick={() => clickMenu("navbar__menu_dropdown")}><img src={menu}></img></button>
          <div id='navbar__menu_dropdown' className='navbar__buttons-dropdown_content scale-up-tr'>
            <Link to='/courses'>View Courses</Link>
            <Link to='/topics'>View Topics</Link>
          </div>
        </div>
        {/* <button type="button"><img src={messages}></img></button>
        <button type="button"><img src={notifications}></img></button> */}
        {user && (<Link to='/createpost'><button type="button"><img src={createpost}></img></button></Link>)}
        {user ? (          
          <div className='navbar__buttons-dropdown'>
            <button type="button" onClick={() => clickMenu("navbar__profile_dropdown")}><img src={profile} alt="Profile"></img></button>
            <div id='navbar__profile_dropdown' className='navbar__buttons-dropdown_content scale-up-tr'>
              <Link to={"/profile/" + user.username}>View Profile</Link>
              <Link to="/" onClick={logout}>Logout</Link>
            </div>
          </div>
        ) : (
          <div className='navbar__buttons-login'>
            <Link to="/login">Login</Link>
          </div>

        )}
      </div>
    </div> 
  )
}
export default Header