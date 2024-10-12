import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ClockIcon, PlusCircleIcon, SparklesIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import LoadingSpinner from '../components/LoadingSpinner'

const multipliers = [
  { duration: '1 hour', price: 1000, icon: <ClockIcon className="w-6 h-6" /> },
  { duration: '3 hours', price: 3000, icon: <ClockIcon className="w-6 h-6" /> },
  { duration: '8 hours', price: 6000, icon: <ClockIcon className="w-6 h-6" /> },
  { duration: '12 hours', price: 10000, icon: <ClockIcon className="w-6 h-6" /> },
  { duration: '1 day', price: 20000, icon: <ClockIcon className="w-6 h-6" /> },
  { duration: '1 month', price: 25000, icon: <ClockIcon className="w-6 h-6" /> },
]

const guessChances = [
  { type: 'Single Chance', amount: 1, price: 500, icon: <PlusCircleIcon className="w-6 h-6" /> },
  { type: 'Weekly Bundle', amount: 56, price: 30000, icon: <PlusCircleIcon className="w-6 h-6" /> },
  { type: 'Monthly Bundle', amount: 450, price: 50000, icon: <PlusCircleIcon className="w-6 h-6" /> },
]

function Store() {
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
    <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Store</h1>
      <div className="w-full max-w-4xl">
        <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center justify-center">
                <h4 className="text-2xl font-semibold mr-4">Balance:</h4>
                <div className="flex items-center flex-row justify-center">
                    <img src="/moxie-logo-square.webp" alt="Moxie Logo" className="w-6 h-6 mr-1 rounded-2xl" />
                    <span className="text-xl font-bold text-yellow-400">{moxieBalance.toLocaleString()}</span>
                </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-full font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Add MOXIE
            </motion.button>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <SparklesIcon className="w-6 h-6 mr-2 text-yellow-400" />
            Multipliers
          </h2>
          <p className="text-sm text-gray-400 mb-4">All multipliers increase your chance to get Fan Tokens by 15%!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {multipliers.map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-700 rounded-lg p-4 flex flex-col items-center justify-between shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
                <h3 className="text-lg font-semibold my-2">{item.duration}</h3>
                <p className="text-yellow-400 font-bold">{item.price.toLocaleString()} MOXIE</p>
                <p className="text-xs text-green-400 mt-1">+15% Fan Token chance</p>
                <button
                  onClick={() => handlePurchase(item, 'multiplier')}
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-200"
                >
                  Purchase
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <PlusCircleIcon className="w-6 h-6 mr-2 text-green-400" />
            Guess Chances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {guessChances.map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-700 rounded-lg p-4 flex flex-col items-center justify-between shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
                <h3 className="text-lg font-semibold my-2">{item.type}</h3>
                <p className="text-sm">{item.amount} chance{item.amount > 1 ? 's' : ''}</p>
                <p className="text-yellow-400 font-bold">{item.price.toLocaleString()} MOXIE</p>
                <button
                  onClick={() => handlePurchase(item, 'guessChance')}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-200"
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
