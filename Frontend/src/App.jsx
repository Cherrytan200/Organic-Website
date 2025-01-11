import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Pages/Home.jsx';
import About from './Pages/About.jsx'
import Signin from './Pages/Signin.jsx'
import Contact from './Pages/Contact.jsx'
import Signup from './Pages/Signup.jsx';
import Explore from './Pages/Explore.jsx';
import Header from './Components/Header.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/sign-in' element={<Signin/>}/>
          <Route path='/sign-up' element={<Signup/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/explore' element={<Explore/>}/>
        </Routes>
    </BrowserRouter>
  )
}
