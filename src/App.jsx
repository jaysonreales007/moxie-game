import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import NavBar from './components/NavBar'
import Background from './components/Background'
import Home from './pages/Home'
import Game from './pages/Game'
import Store from './pages/Store'
import Inventory from './pages/Inventory'
import LeaderBoard from './pages/LeaderBoard'
import Profile from './pages/Profile'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white relative">
        <Background />
        <ToastContainer />
        <NavBar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/store" element={<Store />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
