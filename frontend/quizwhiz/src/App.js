import './App.css'
import Home from './components/Home'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Link } from 'react-router-dom'
import Takequiz from './components/Takequiz'
import Quizqn from './components/Quizqn'
import Login from './components/Login'
import Signup from './components/Signup'

function App() {
  return (
    <div className="App">
      <Router>      
        <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Takequiz' element={<Takequiz />}/>
      <Route path='/Quizqn' element={<Quizqn />}/>
      </Routes>
      </Router>
      
    </div>
  );
}

export default App;
