import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ClockIcon, PlusCircleIcon, SparklesIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import LoadingSpinner from '../components/LoadingSpinner'
import { FiPlus } from "react-icons/fi";
import moxieLogo from '/moxie-logo-square.webp'; // Import the Moxie logo
import { useTranslation } from 'react-i18next'

const multipliers = [
  { duration: '1 hour', price: 1000, icon: <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
  { duration: '3 hours', price: 3000, icon: <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
  { duration: '8 hours', price: 6000, icon: <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
  { duration: '12 hours', price: 10000, icon: <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
  { duration: '1 day', price: 20000, icon: <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
  { duration: '1 month', price: 25000, icon: <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
]

const guessChances = [
  { type: 'Single Chance', amount: 1, price: 500, icon: <PlusCircleIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
  { type: 'Weekly Bundle', amount: 56, price: 30000, icon: <PlusCircleIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
  { type: 'Monthly Bundle', amount: 450, price: 50000, icon: <PlusCircleIcon className="w-5 h-5 sm:w-6 sm:h-6" /> },
]

function Store() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [moxieBalance, setMoxieBalance] = useState(100000); // Example balance, replace with actual balance from game state

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handlePurchase = (item, type) => {
    if (moxieBalance >= item.price) {
      setMoxieBalance(prevBalance => prevBalance - item.price);
      // Here you would also update the player's inventory or active multipliers
      alert(`Purchased ${type === 'multiplier' ? item.duration : item.type}!`);
    } else {
      alert("Not enough MOXIE to make this purchase.");
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-2 sm:p-4 bg-gray-900 text-white relative overflow-hidden">
      {/* Random Moxie Images */}
      <img src="/moxie-3.png" alt="Moxie" className="absolute top-20 left-20 w-16 h-16 sm:w-24 sm:h-24 opacity-20" />
      <img src="/moxie-1.png" alt="Moxie" className="absolute bottom-40 right-10 w-24 h-24 sm:w-32 sm:h-32 opacity-20" />

      <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-8 relative z-10">{t('store.title')}</h1>
      <div className="w-full max-w-4xl">
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-4 sm:mb-8 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center mb-4 sm:mb-0">
                <h4 className="text-xl sm:text-2xl font-semibold mr-2 sm:mr-4">Balance:</h4>
                <div className="flex items-center flex-row justify-center">
                    <img src={moxieLogo} alt="Moxie Logo" className="w-6 h-6 sm:w-8 sm:h-8 mr-2 rounded-full" />
                    <span className="text-lg sm:text-xl font-bold text-yellow-400">{moxieBalance.toLocaleString()}</span>
                </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 sm:px-4 sm:py-2 bg-yellow-500 text-gray-900 flex flex-row items-center justify-center rounded-full font-semibold hover:bg-yellow-400 transition-colors duration-200 text-xs sm:text-sm"
            >
              <FiPlus className='mr-1 sm:mr-2'/>
              Add MOXIE
            </motion.button>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-4 sm:mb-8 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center">
            <SparklesIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-yellow-400" />
            Multipliers
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mb-4">All multipliers increase your chance to get Fan Tokens by 15%!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {multipliers.map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-700 rounded-lg p-3 sm:p-4 flex flex-col items-center justify-between shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {item.icon}
                <h3 className="text-base sm:text-lg font-semibold my-2">{item.duration}</h3>
                <p className="text-yellow-400 font-bold text-sm sm:text-base">{item.price.toLocaleString()} MOXIE</p>
                <p className="text-xs text-green-400 mt-1">+15% Fan Token chance</p>
                <button
                  onClick={() => handlePurchase(item, 'multiplier')}
                  className="mt-2 sm:mt-4 px-3 py-1 sm:px-4 sm:py-2 bg-purple-600 text-white rounded-full text-xs sm:text-sm hover:bg-purple-700 transition-colors duration-200"
                >
                  Purchase
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center">
            <PlusCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-green-400" />
            Guess Chances
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {guessChances.map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-700 rounded-lg p-3 sm:p-4 flex flex-col items-center justify-between shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {item.icon}
                <h3 className="text-base sm:text-lg font-semibold my-2">{item.type}</h3>
                <p className="text-xs sm:text-sm">{item.amount} chance{item.amount > 1 ? 's' : ''}</p>
                <p className="text-yellow-400 font-bold text-sm sm:text-base">{item.price.toLocaleString()} MOXIE</p>
                <button
                  onClick={() => handlePurchase(item, 'guessChance')}
                  className="mt-2 sm:mt-4 px-3 py-1 sm:px-4 sm:py-2 bg-green-600 text-white rounded-full text-xs sm:text-sm hover:bg-green-700 transition-colors duration-200"
                >
                  Purchase
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Store
