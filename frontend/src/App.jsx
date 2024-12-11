/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
import FetchData from './pages/fetchData'
import One from './pages/One'
import Signup from './pages/Signup'
import { BrowserRouter as Router, Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './pages/Login'

// import One from './pages/One'

function App() {
//  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element = { < Signup /> } />
        <Route path='/login' element = { < Login /> } />
        <Route path='/one' element = { < One /> } />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
