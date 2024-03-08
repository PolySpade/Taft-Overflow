import React from 'react';

import './App.css';

import { Header,Footer,Body,Leftsidebar,Rightsidebar } from './containers';



function App() {
  return (
    <div className="home__container">
      <Header></Header>
      <div className="home__container-body">
        <Leftsidebar></Leftsidebar>
        <Body></Body>
        <Rightsidebar></Rightsidebar>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
