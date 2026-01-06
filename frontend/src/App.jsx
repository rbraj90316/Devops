
import './App.css'
import Register from './pages/Register'
import { Home } from './pages/Home'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
function App() {
  return (
    <>
      <h1 className='text-3xl text-amber-400 p-4 bg-blue-700 rounded-4xl border-4'>Frontend running 🚀</h1>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
