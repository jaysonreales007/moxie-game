import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'
import LoadingSpinner from '../components/LoadingSpinner'

// This is a placeholder. In a real app, you'd fetch this data from your game state or backend.
const mockInventory = {
  moxie: 15000,
  fanTokens: [
    { name: 'Airstack', amount: 3 },
    { name: 'Fan Token Tavern', amount: 2 },
    { name: 'bigdegenenergy', amount: 1 },
    { name: 'bigenery', amount: 5 },
    { name: 'arob1000', amount: 2 },
    { name: 'dirtykumquats', amount: 1 },
    { name: 'collectorcanyon', amount: 4 },
    { name: 'degen-chad', amount: 3 },
    { name: 'superrare', amount: 2 },
  ]
};

function Inventory() {
  const [isLoading, setIsLoading] = useState(true);
  const [inventory, setInventory] = useState(null);
  const [error, setError] = useState(null);

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

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Inventory</h1>
      <div className="w-full max-w-4xl">
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            
            Fan Tokens
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inventory.fanTokens.map((token, index) => (
              <motion.div
                key={index}
                className="bg-gray-700 rounded-lg p-4 flex flex-col items-center justify-between shadow-md"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <img 
                  src={`/moxie-logo-square.png`} 
                  alt={`${token.name} logo`}
                  className="w-16 h-16 mb-2 rounded-full"
                />
                <h3 className="text-lg font-semibold my-2">{token.name}</h3>
                <p className="text-2xl font-bold text-purple-400">{token.amount}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inventory
