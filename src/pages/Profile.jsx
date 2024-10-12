import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { UserCircleIcon, CogIcon, ShieldCheckIcon, BellIcon, MoonIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import LoadingSpinner from '../components/LoadingSpinner'

// Mock user data
const mockUserData = {
  username: 'MoxieMiner123',
  email: 'moxieminer123@example.com',
  avatar: '/moxie-logo-square.webp',
  notifications: true,
  darkMode: false,
  language: 'English',
  twoFactorAuth: false
}

function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // Simulate loading delay and fetching user data
    const timer = setTimeout(() => {
      setUserData(mockUserData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleToggle = (setting) => {
    setUserData({ ...userData, [setting]: !userData[setting] });
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Profile</h1>
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="flex border-b border-gray-700">
          <button
            className={`flex-1 py-4 px-6 focus:outline-none ${activeTab === 'profile' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile Settings
          </button>
          <button
            className={`flex-1 py-4 px-6 focus:outline-none ${activeTab === 'advanced' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
            onClick={() => setActiveTab('advanced')}
          >
            Advanced Settings
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'profile' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <img src={userData.avatar} alt="Profile" className="w-20 h-20 rounded-full mr-4" />
                <div className='flex flex-col items-start'>
                  <h2 className="text-2xl font-semibold">{userData.username}</h2>
                  <p className="text-gray-400">{userData.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <button className="w-full py-2 px-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors duration-200">
                  Save Changes
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            > 
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <GlobeAltIcon className="h-6 w-6 text-gray-400 mr-2" />
                  <span>Language</span>
                </div>
                <select
                  value={userData.language}
                  onChange={(e) => setUserData({ ...userData, language: e.target.value })}
                  className="bg-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ShieldCheckIcon className="h-6 w-6 text-gray-400 mr-2" />
                  <span>Two-Factor Authentication</span>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={userData.twoFactorAuth}
                    onChange={() => handleToggle('twoFactorAuth')}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <button className="w-full py-2 px-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors duration-200">
                Save Advanced Settings
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
