// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './pages/Register'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
function App() {
  return (
    <>
      <h1 className='text-3xl text-amber-400 p-4 bg-blue-700 rounded-4xl border-4'>Frontend running 🚀</h1>
      <Router>
        <Routes>
          <Route path='/register' element={<Register/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
