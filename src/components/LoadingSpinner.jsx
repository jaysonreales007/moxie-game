import { motion } from 'framer-motion';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <motion.div
      className="flex space-x-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-4 h-4 bg-purple-600 rounded-full"
          animate={{
            y: ['0%', '-50%', '0%'],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      ))}
    </motion.div>
  </div>
);

export default LoadingSpinner;
