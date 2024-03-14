import React from 'react'

import { BrowserRouter,Routes, Route, Outlet } from 'react-router-dom'

import {Header,Footer} from '../../containers/index';

import {Home, Topics, Topic} from '../../pages/index';

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
                        <Route path='*' element={<Home/>} />
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