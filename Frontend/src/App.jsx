import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import { getPost } from './api/PostApi'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
// import { useEffect } from 'react'
// import { useState } from'react'

const App = () => {

  // const [data, setData] = useState([])


  // const getPostData = async () => {
  //   const res = await getPost()
  //   setData(res.data);
  // }

  // useEffect(() => {
  //   getPostData();
  
  // }, [])

  // console.log(data);
  
  
   

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>

      <Navbar/>
      
      <SearchBar />

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/place-order' element={<PlaceOrder/>} />
        <Route path='/orders' element={<Orders/>} />
      </Routes>

      <Footer/>

    </div>
  )
}

export default App
