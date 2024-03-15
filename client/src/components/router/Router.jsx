import React from 'react'

import { BrowserRouter,Routes, Route, Outlet } from 'react-router-dom'

import {Header,Footer} from '../../containers/index';

import { Home, Topics, Topic,Posts, Post, Popular, Bookmarks, Courses, Course, Createpost, Profile } from '../../pages/index';

import './router.css'


const Router = () => {
    const Layout = () => {
        return (
            <div className="layout__container">
                <Header/>
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
                        <Route index element={<Home/>} />
                        <Route path='/home' element={<Home/>} />
                        <Route path='/topics' element={<Topics/>}/>
                        <Route path='/topics/:id' element={<Topic/>}/>
                        <Route path='/posts' element={<Posts/>}/>
                        <Route path='/posts/:id' element={<Post/>}/>
                        <Route path='/popular' element={<Popular/>}/>
                        <Route path='/bookmarks' element={<Bookmarks/>}/>
                        <Route path='/courses' element={<Courses/>}/>
                        <Route path='/courses/:id' element={<Course/>}/>
                        <Route path='/createpost' element={<Createpost/>}/>
                        <Route path='*' element={<Home/>} />
                        <Route path='/profile/:id' element={<Profile/>}/>
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