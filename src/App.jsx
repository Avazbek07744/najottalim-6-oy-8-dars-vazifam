import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import About from './pages/About'
import Contact from './pages/Contact'
import Deteils from './pages/Deteils'
import Error from './pages/Error'
import Register from './pages/form/Register'
import Login from './pages/form/Login'

const App = () => {
  return (
    <div>
      <header className='flex gap-5 font-bold text-2xl text-blue-500 justify-center mt-5'>
        <Link to='/register'>Register</Link>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
      </header>

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/products/:id' element={<Deteils />}></Route>
        <Route path='*' element={<Error />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </div>
  )
}

export default App
