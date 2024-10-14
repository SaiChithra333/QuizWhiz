import './App.css'
import Home from './components/Home'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Link } from 'react-router-dom'
import Takequiz from './components/Takequiz'
import Quizqn from './components/Quizqn'
import Login from './components/Login'
import Register from './components/Register'
import UserPage from './components/UserPage'
import GoogleAuthRedirect from './components/GoogleAuthRedirect'

function App() {
  return (
    <div className="App">
      <Router>      
        <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Takequiz' element={<Takequiz />}/>
      <Route path='/Quizqn' element={<Quizqn />}/>
      <Route path='/UserPage' element={<UserPage />}/>
      <Route path="/auth/google/secrets" element={<GoogleAuthRedirect />} />
      </Routes>
      </Router>
      
    </div>
  );
}

export default App;
