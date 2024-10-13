import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CurrencyDollarIcon, UserIcon, HashtagIcon } from '@heroicons/react/24/outline'
import LoadingSpinner from '../components/LoadingSpinner'
import moxieLogo from '/moxie-logo-square.webp'; // Import the Moxie logo

// This is a placeholder. In a real app, you'd fetch this data from your game state or backend.
const mockInventory = {
  moxie: 15000,
  fanTokens: [
    { name: 'Airstack', amount: 3 },
    { name: '/fantokentavern', amount: 2 },
    { name: 'bigdegenenergy', amount: 1 },
    { name: '/bigenery', amount: 5 },
    { name: 'arob1000', amount: 2 },
    { name: '/dirtykumquats', amount: 1 },
    { name: '/collectorcanyon', amount: 4 },
    { name: 'degen-chad', amount: 3 },
    { name: '/superrare', amount: 2 },
  ]
};

function Inventory() {
  const [isLoading, setIsLoading] = useState(true);
  const [inventory, setInventory] = useState(null);
  const [error, setError] = useState(null);
  const [selectedTokenType, setSelectedTokenType] = useState('all');

  useEffect(() => {
    // Simulate loading delay and fetching inventory
    const timer = setTimeout(() => {
      try {
        // In a real app, you'd fetch data here
        setInventory(mockInventory);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching inventory:", err);
        setError("Failed to load inventory. Please try again later.");
        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!inventory) {
    return <div className="text-yellow-500 text-center mt-10">No inventory data available.</div>;
  }

  const userTokens = inventory.fanTokens.filter(token => !token.name.startsWith('/'));
  const channelTokens = inventory.fanTokens.filter(token => token.name.startsWith('/'));

  const displayTokens = selectedTokenType === 'user' ? userTokens :
                        selectedTokenType === 'channel' ? channelTokens :
                        inventory.fanTokens;

  return (
    <div className="flex flex-col items-center justify-start h-full p-2 sm:p-4 bg-gray-900 text-white relative">
      {/* Random Moxie Images */}
      <img src="/moxie-1.png" alt="Moxie" className="absolute top-20 right-10 w-24 h-24 sm:w-36 sm:h-36 opacity-20" />
      <img src="/moxie-4.png" alt="Moxie" className="absolute bottom-20 left-20 w-20 h-20 sm:w-28 sm:h-28 opacity-20" />

      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 relative z-10">Inventory</h1>
      <div className="w-full max-w-4xl">
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-semibold flex items-center">
              <CurrencyDollarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 mr-2" />
              MOXIE Balance
            </h2>
            <div className="flex items-center">
              <img src={moxieLogo} alt="Moxie Logo" className="w-6 h-6 sm:w-8 sm:h-8 mr-2 rounded-full" />
              <span className="text-2xl sm:text-3xl font-bold text-yellow-400">{inventory.moxie.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center">
            Fan Tokens
          </h2>
          <div className="mb-4">
            <label htmlFor="tokenType" className="block text-sm font-medium text-gray-400 mb-1">Filter Fan Tokens</label>
            <select
              id="tokenType"
              value={selectedTokenType}
              onChange={(e) => setSelectedTokenType(e.target.value)}
              className="w-full bg-gray-700 rounded-lg p-2 text-sm sm:text-base focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value="all">All Fan Tokens</option>
              <option value="user">User Fan Tokens</option>
              <option value="channel">Channel Fan Tokens</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayTokens.map((token, index) => (
              <motion.div
                key={index}
                className="bg-gray-700 rounded-lg p-3 sm:p-4 flex flex-col items-center justify-between shadow-md"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <img 
                  src={moxieLogo}
                  alt={`${token.name} logo`}
                  className="w-12 h-12 sm:w-16 sm:h-16 mb-2 rounded-full"
                />
                <h3 className="text-base sm:text-lg font-semibold my-2">
                  {token.name.startsWith('/') ? token.name : token.name}
                </h3>
                <p className="text-xl sm:text-2xl font-bold text-purple-400">{token.amount}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inventory
