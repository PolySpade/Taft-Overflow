import React, { useEffect, useState }  from 'react'

import { BrowserRouter,Routes, Route, Outlet, Navigate } from 'react-router-dom'

import {Header,Footer} from '../../containers/index';

import { Home, Topics, Topic,Posts, Post, Popular, Bookmarks, Courses, Course, Createpost, Profile, Registration, Search_results, Login, Createcourse } from '../../pages/index';

import './router.css'

import axios from 'axios'


const Router = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/current_user`)
          .then(response => {
            const { username, _id } = response.data;
            setUser({ username, _id }); 
          })
          .catch(error => {
            console.error('Error fetching user:', error);
            setUser(null);
          });
    }, []);

    const logout = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/logout`)
          .then(() => {
            setUser(null);
          })
          .catch(error => {
            console.error('Logout error:', error);
          });
      };

    const Layout = () => {
        return (
            <div className="layout__container">
                <Header user={user} logout={logout}/>
                <Outlet/>
                <Footer/>
            </div>
        )
    }
    
    const BrowserRoutes = () => {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout/>}>
                        <Route index element={<Home user={user}/>} />
                        <Route path='/home' element={<Home user={user}/>} />
                        <Route path='/topics' element={<Topics/>}/>
                        <Route path='/topics/:id' element={<Topic user={user}/>}/>
                        <Route path='/posts' element={<Posts user={user}/>}/>
                        <Route path='/posts/:id' element={<Post user={user}/>}/>
                        <Route path='/popular' element={<Popular user={user}/>}/>
                        <Route path='/bookmarks' element={<Bookmarks user={user}/>}/>
                        <Route path='/courses' element={<Courses/>}/>
                        <Route path='/courses/:id' element={<Course user={user}/>}/>
                        <Route
                            path='/createpost'
                            element={user ? <Createpost user={user} /> : <Navigate to='/home' replace />}
                        />
                        <Route
                            path='/createcourse'
                            element={user ? <Createcourse user={user} /> : <Navigate to='/home' replace />}
                        />

                        <Route path='*' element={<Home user={user}/>} />
                        <Route path='/profile/:id' element={<Profile user={user}/>}/>
                        <Route path='/search-results' element={<Search_results user={user}/>}/>
                        <Route path='/register' element={user ? <Navigate to='/home' replace /> : <Registration />} />
                        <Route path='/login' element={user ? <Navigate to='/home' replace /> : <Login />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }

    return (
        <>
        <BrowserRoutes/>
        </>
    )
}

export default Router