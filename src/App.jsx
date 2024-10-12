import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import NavBar from './components/NavBar';
import Background from './components/Background';
import Home from './pages/Home';
import Game from './pages/Game';
import Store from './pages/Store';
import Inventory from './pages/Inventory';
import Profile from './pages/Profile';
import { ThemeProvider } from './ThemeContext';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white relative transition-colors duration-200">
          <Background />
          <ToastContainer />
          <NavBar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/store" element={<Store />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
