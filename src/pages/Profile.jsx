import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { UserCircleIcon, CogIcon, ShieldCheckIcon, BellIcon, MoonIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import LoadingSpinner from '../components/LoadingSpinner'
import moxieLogo from '/moxie-logo-square.webp'; // Import the Moxie logo
import { useTranslation } from 'react-i18next'

// Mock user data
const mockUserData = {
  username: 'MoxieMiner123',
  email: 'moxieminer123@example.com',
  avatar: moxieLogo, // Use the imported Moxie logo
  notifications: true,
  darkMode: false,
  language: 'en',
  twoFactorAuth: false
}

function Profile() {
  const { t, i18n } = useTranslation();
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

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setUserData({ ...userData, language: newLang });
    i18n.changeLanguage(newLang);
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-2 sm:p-4 bg-gray-900 text-white relative overflow-hidden">
      {/* Random Moxie Images */}
      <img src="/moxie-4.png" alt="Moxie" className="absolute top-10 left-20 w-16 h-16 sm:w-24 sm:h-24 opacity-20" />
      <img src="/moxie-1.png" alt="Moxie" className="absolute bottom-20 right-10 w-24 h-24 sm:w-36 sm:h-36 opacity-20" />

      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 relative z-10">{t('profile.title')}</h1>
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="flex border-b border-gray-700">
          <button
            className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 focus:outline-none text-sm sm:text-base ${activeTab === 'profile' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
            onClick={() => setActiveTab('profile')}
          >
            {t('profile.profileSettings')}
          </button>
          <button
            className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 focus:outline-none text-sm sm:text-base ${activeTab === 'advanced' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
            onClick={() => setActiveTab('advanced')}
          >
            {t('profile.advancedSettings')}
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {activeTab === 'profile' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <img src={userData.avatar} alt="Profile" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mr-4" />
                <div className='flex flex-col items-start'>
                  <h2 className="text-xl sm:text-2xl font-semibold">{userData.username}</h2>
                  <p className="text-sm sm:text-base text-gray-400">{userData.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1">{t('profile.username')}</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 rounded-lg p-2 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">{t('profile.email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 rounded-lg p-2 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <button className="w-full py-2 px-4 bg-purple-600 text-white font-bold rounded-lg text-sm sm:text-base hover:bg-purple-700 transition-colors duration-200">
                  {t('profile.saveChanges')}
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
                  <GlobeAltIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 mr-2" />
                  <span className="text-sm sm:text-base">{t('profile.language')}</span>
                </div>
                <select
                  value={userData.language}
                  onChange={handleLanguageChange}
                  className="bg-gray-700 rounded-lg p-2 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ShieldCheckIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 mr-2" />
                  <span className="text-sm sm:text-base">{t('profile.twoFactorAuth')}</span>
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
              <button className="w-full py-2 px-4 bg-purple-600 text-white font-bold rounded-lg text-sm sm:text-base hover:bg-purple-700 transition-colors duration-200">
                {t('profile.saveAdvancedSettings')}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
