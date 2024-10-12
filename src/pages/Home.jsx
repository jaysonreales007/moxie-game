import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PlayIcon } from '@heroicons/react/24/solid'
import LoadingSpinner from '../components/LoadingSpinner'

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden">
      {/* Animated Background Image */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0, scale: 2 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          backgroundImage: 'url("/moxie-4.png")',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></motion.div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.h1 
          className="text-6xl font-bold mb-8 text-white shadow-text"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Welcome to Moxie Miner
        </motion.h1>
        <motion.p 
          className="text-xl mb-12 text-white shadow-text"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Discover hidden treasures and collect Fan Tokens in this exciting puzzle game!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <Link 
            to="/game" 
            className="px-8 py-4 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center space-x-2 group shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <span className="text-xl">Start Playing</span>
            <motion.div
              animate={{
                x: [0, 5, 0],
                rotate: [0, 15, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative"
            >
              <PlayIcon className="h-8 w-8 text-white group-hover:text-yellow-300 transition-colors duration-200" />
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.img
        src="/moxie-2.png"
        alt="Moxie Character"
        className="absolute bottom-0 left-0 w-64 h-64 object-contain"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      />
      <motion.img
        src="/moxie-1.png"
        alt="Moxie Character"
        className="absolute bottom-0 right-0 w-64 h-64 object-contain"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.3 }}
      />
    </div>
  )
}

export default Home
