import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ToastContainer, toast } from 'react-toastify'
import { GiftIcon, ArrowPathIcon, CurrencyDollarIcon, SparklesIcon, CogIcon, UserCircleIcon, ShoppingBagIcon, ChartBarIcon, BookOpenIcon, SpeakerWaveIcon, SpeakerXMarkIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

const MIN_GRID_SIZE = 4;
const MAX_GRID_SIZE = 10;
const MAX_GUESSES = 5;
const FAN_TOKENS = ['Airstack', 'Fan Token Tavern', 'bigdegenenergy', 'bigenery', 'arob1000', 'dirtykumquats', 'collectorcanyon', 'degen-chad', 'superrare'];

function App() {
  const [gridSize, setGridSize] = useState(MIN_GRID_SIZE);
  const [moxieBalance, setMoxieBalance] = useState(0)
  const [fanTokenBalances, setFanTokenBalances] = useState(
    Object.fromEntries(FAN_TOKENS.map(token => [token, 0]))
  )
  const [grid, setGrid] = useState([])
  const [guessesLeft, setGuessesLeft] = useState(MAX_GUESSES)
  const [currentPrize, setCurrentPrize] = useState(null)
  const [prizeGuessCount, setPrizeGuessCount] = useState(0)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [tempPrize, setTempPrize] = useState(null)
  const [unclaimedPrizes, setUnclaimedPrizes] = useState([])
  const [showNewGameConfirmation, setShowNewGameConfirmation] = useState(false);
  const [showResetConfirmation, setShowResetConfirmation] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [hasStartedGame, setHasStartedGame] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const clickSoundRef = useRef(new Audio('/click.wav'));
  const gameOverSoundRef = useRef(new Audio('/game-over.wav'));
  const winSoundRef = useRef(new Audio('/win.wav')); // Add this line
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    resetGame();
  }, [gridSize]);

  const calculateProbabilities = () => {
    const totalCells = gridSize * gridSize;
    
    // Determine the number of empty cells
    const minEmpty = Math.floor(totalCells * 0.6); // At least 60% of cells are empty
    const maxEmpty = Math.floor(totalCells * 0.8); // At most 80% of cells are empty
    const numberOfEmptyCells = Math.floor(Math.random() * (maxEmpty - minEmpty + 1)) + minEmpty;

    console.log(`Num empty cells: ${numberOfEmptyCells}`)
    
    // Calculate safe cells
    const safeCells = totalCells - numberOfEmptyCells;
    console.log(`safe cells: ${safeCells}`)
    
    // Distribute prizes among safe cells
    const majorPrizes = Math.max(1, Math.floor(safeCells * 0.15)); // 15% of safe cells are major prizes
    const minorPrizes = Math.max(1, Math.floor(safeCells * 0.4)); // 40% of safe cells are minor prizes

    
    console.log(`major: ${majorPrizes}`)
    
    console.log(`minor: ${minorPrizes}`)
    
    // Calculate probabilities
    const fanTokenProb = majorPrizes / totalCells;
    const moxieProb = minorPrizes / totalCells;
    const emptyProb = numberOfEmptyCells / totalCells;
    
    console.log(`fan token: ${fanTokenProb}`)
    
    console.log(`moxie: ${moxieProb}`)
    
    console.log(`empty prob: ${emptyProb}`)
    
    return { fanTokenProb, moxieProb, emptyProb, majorPrizes, minorPrizes, numberOfEmptyCells };
  }

  const resetGame = () => {
    const { fanTokenProb, moxieProb, emptyProb, majorPrizes, minorPrizes, numberOfEmptyCells } = calculateProbabilities();
    const totalCells = gridSize * gridSize;
    let newGrid = Array(totalCells).fill(null);
    
    // Place bombs (empty cells)
    for (let i = 0; i < numberOfEmptyCells; i++) {
      let index;
      do {
        index = Math.floor(Math.random() * totalCells);
      } while (newGrid[index] !== null);
      newGrid[index] = { type: 'empty', revealed: false };
    }
    
    // Place major prizes (Fan Tokens)
    for (let i = 0; i < majorPrizes; i++) {
      let index;
      do {
        index = Math.floor(Math.random() * totalCells);
      } while (newGrid[index] !== null);
      newGrid[index] = { type: 'fanToken', revealed: false };
    }
    
    // Place minor prizes (MOXIE)
    for (let i = 0; i < minorPrizes; i++) {
      let index;
      do {
        index = Math.floor(Math.random() * totalCells);
      } while (newGrid[index] !== null);
      newGrid[index] = { type: 'moxie', revealed: false };
    }
    
    setGrid(newGrid);
    setGuessesLeft(MAX_GUESSES);
    setCurrentPrize(null);
    setPrizeGuessCount(0);
    setUnclaimedPrizes([]);
    setShowConfirmation(false);
    setTempPrize(null);
    setHasStartedGame(false);
  }

  const handleGridSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setGridSize(newSize);
  }

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const playSound = (sound) => {
    if (soundEnabled) {
      sound.play();
    }
  };

  const handleBoxClick = (index) => {
    if (grid[index] !== null && grid[index].revealed || guessesLeft === 0) return;

    // Play click sound
    playSound(clickSoundRef.current);

    setHasStartedGame(true);

    let prize = null;

    if (grid[index] && grid[index].type === 'fanToken') {
      const randomFanToken = FAN_TOKENS[Math.floor(Math.random() * FAN_TOKENS.length)];
      prize = { type: 'fanToken', token: randomFanToken, value: 1 };
      setTempPrize(prize);
      setShowConfirmation(true);
      playSound(winSoundRef.current); // Play win sound
    } else if (grid[index] && grid[index].type === 'moxie') {
      const moxieAmount = Math.floor(Math.random() * 2500) + 1; // Random value from 1 to 2500
      prize = { type: 'moxie', value: moxieAmount };
      setTempPrize(prize);
      setShowConfirmation(true);
      playSound(winSoundRef.current); // Play win sound
    } else {
      toast.error("Oops! Better luck next time!", {
        position: "top-right",
        autoClose: 1500,
      });
    }

    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      if (newGrid[index] === null) {
        newGrid[index] = { type: 'empty', revealed: true };
      } else {
        newGrid[index] = { ...newGrid[index], revealed: true };
      }
      return newGrid;
    });

    setGuessesLeft(prevGuesses => {
      const newGuessesLeft = prevGuesses - 1;
      if (newGuessesLeft === 0) {
        // Play game over sound
        playSound(gameOverSoundRef.current);
        setShowNewGameConfirmation(true);
      }
      return newGuessesLeft;
    });
  }

  const handleConfirm = (claim) => {
    if (claim) {
      claimPrize(tempPrize);
      playSound(winSoundRef.current);
    } else {
      addToUnclaimedPrizes(tempPrize);
    }
    setShowConfirmation(false);
    setTempPrize(null);
  }

  const claimPrize = (prize) => {
    if (prize.type === 'moxie') {
      setMoxieBalance(prevBalance => prevBalance + prize.value);
      toast.success(`Claimed ${prize.value} MOXIE!`, {
        position: "top-right",
        autoClose: 1500,
      });
    } else if (prize.type === 'fanToken') {
      setFanTokenBalances(prevBalances => ({
        ...prevBalances,
        [prize.token]: prevBalances[prize.token] + prize.value
      }));
      toast.success(`Claimed 1 ${prize.token} Fan Token!`, {
        position: "top-right",
        autoClose: 1500,
      });
    }
  }

  const addToUnclaimedPrizes = (prize) => {
    setUnclaimedPrizes(prevPrizes => {
      if (prize.type === 'fanToken') {
        const existingPrizeIndex = prevPrizes.findIndex(p => p.type === 'fanToken' && p.token === prize.token);
        if (existingPrizeIndex !== -1) {
          const newPrizes = [...prevPrizes];
          newPrizes[existingPrizeIndex].value += prize.value;
          return newPrizes;
        }
      }
      return [...prevPrizes, prize];
    });
  }

  const claimAllPrizes = () => {
    unclaimedPrizes.forEach(prize => claimPrize(prize));
    setUnclaimedPrizes([]);
    resetGame(); // Add this line to reset the game after claiming prizes
  }

  const revealAllBoxes = () => {
    setGrid(prevGrid => prevGrid.map(box => box ? { ...box, revealed: true } : { type: 'empty', revealed: true }));
    setGuessesLeft(0);
  }

  const handleNewGameConfirm = (startNew) => {
    if (startNew) {
      resetGame();
    } else {
      revealAllBoxes();
    }
    setShowNewGameConfirmation(false);
  }

  const handleResetGame = () => {
    setShowResetConfirmation(true);
  }

  const handleNewGame = () => {
    setShowNewGameConfirmation(true);
  }

  const confirmResetGame = (confirm) => {
    if (confirm) {
      resetGame();
    }
    setShowResetConfirmation(false);
  }

  const confirmNewGame = (confirm) => {
    if (confirm) {
      setMoxieBalance(0);
      setFanTokenBalances(Object.fromEntries(FAN_TOKENS.map(token => [token, 0])));
      resetGame();
    }
    setShowNewGameConfirmation(false);
  }

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <ToastContainer />
      
      {/* Navbar */}
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img src="/logo.png" alt="Game Logo" className="h-8 w-auto mr-3" />
              <span className="font-bold text-xl">Moxie Miner</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                <ShoppingBagIcon className="h-6 w-6 inline-block mr-1" />
                Store
              </button>
              <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                <ChartBarIcon className="h-6 w-6 inline-block mr-1" />
                Leaderboard
              </button>
              <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                <BookOpenIcon className="h-6 w-6 inline-block mr-1" />
                Inventory
              </button>
              <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">
                <UserCircleIcon className="h-6 w-6 inline-block mr-1" />
                Profile
              </button>
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  <ShoppingBagIcon className="h-6 w-6 inline-block mr-2" />
                  Store
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  <ChartBarIcon className="h-6 w-6 inline-block mr-2" />
                  Leaderboard
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  <BookOpenIcon className="h-6 w-6 inline-block mr-2" />
                  Inventory
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
                >
                  <UserCircleIcon className="h-6 w-6 inline-block mr-2" />
                  Profile
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-grow flex flex-col md:flex-row gap-8 max-w-7xl mx-auto w-full p-4 md:p-8">
        <aside className="md:w-1/3 space-y-6">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <CurrencyDollarIcon className="h-6 w-6 text-yellow-400 mr-2" />
              Balances
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">MOXIE</p>
                <p className="text-2xl font-bold">{moxieBalance}</p>
              </div>
              <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
              <div>
                <label htmlFor="fanTokenBalance" className="block text-gray-400 mb-1">
                  Fan Tokens
                </label>
                <select
                  id="fanTokenBalance"
                  className="w-full bg-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  {Object.entries(fanTokenBalances).map(([token, balance]) => (
                    <option key={token} value={token}>{token}: {balance}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <CogIcon className="h-6 w-6 text-purple-400 mr-2" />
              Game Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="gridSize" className="block text-gray-400 mb-1">
                  Grid Size
                </label>
                <select
                  id="gridSize"
                  value={gridSize}
                  onChange={handleGridSizeChange}
                  className="w-full bg-gray-700 rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  {Array.from({ length: MAX_GRID_SIZE - MIN_GRID_SIZE + 1 }, (_, i) => i + MIN_GRID_SIZE).map(size => (
                    <option key={size} value={size}>{size}x{size}</option>
                  ))}
                </select>
              </div>
              <button
                className={`w-full py-2 px-4 bg-purple-600 text-white font-bold rounded-lg transition-colors duration-200 ${
                  hasStartedGame ? 'hover:bg-purple-700' : 'opacity-50 cursor-not-allowed'
                }`}
                onClick={handleResetGame}
                disabled={!hasStartedGame}
              >
                Reset Game
              </button>
              <button
                className="w-full py-2 px-4 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-lg transition-colors duration-200"
                onClick={handleNewGame}
              >
                New Game
              </button>
              <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Sound Effects</span>
                <button
                  onClick={toggleSound}
                  className="p-2 bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {soundEnabled ? (
                    <SpeakerWaveIcon className="h-6 w-6 text-purple-400" />
                  ) : (
                    <SpeakerXMarkIcon className="h-6 w-6 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </aside>

        <section className="md:w-2/3">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <SparklesIcon className="h-6 w-6 text-blue-400" />
                <span className="text-2xl font-bold">Guesses Left: {guessesLeft}</span>
              </div>
              {unclaimedPrizes.length > 0 && (
                <button
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors duration-200"
                  onClick={claimAllPrizes}
                >
                  Claim All Prizes
                </button>
              )}
              {guessesLeft === 0 && (
                <button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors duration-200"
                  onClick={revealAllBoxes}
                >
                  Reveal All
                </button>
              )}
            </div>
            
            {unclaimedPrizes.length > 0 && (
              <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Unclaimed Prizes:</h3>
                {unclaimedPrizes.map((prize, index) => (
                  <div key={index} className="flex justify-between items-center mb-2">
                    <span>
                      {prize.type === 'moxie' 
                        ? `${prize.value} MOXIE` 
                        : `${prize.value} ${prize.token} Fan Token`}
                    </span>
                  </div>
                ))}
              </div>
            )}
            
            <div className={`grid gap-2 mb-2`} style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}>
              {grid.map((box, index) => (
                <motion.button
                  key={index}
                  className={`w-full pt-full rounded-md relative overflow-hidden ${
                    box === null || !box.revealed ? 'bg-gray-600 hover:bg-gray-500' :
                    box.type === 'fanToken' ? 'bg-yellow-500' :
                    box.type === 'moxie' ? 'bg-green-500' : 'bg-red-500'
                  } ${box && box.revealed ? 'bg-opacity-80' : ''}`}
                  onClick={() => handleBoxClick(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={guessesLeft === 0}
                >
                  {box && box.revealed && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center text-2xl"
                    >
                      {box.type === 'fanToken' ? '🏆' : 
                       box.type === 'moxie' ? <img src="/icon.png" alt="Moxie" className="w-3/4 h-3/4 object-contain" /> : 
                       '❌'}
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-md w-full m-4 shadow-2xl"
            >
              <div className="flex items-center mb-6">
                <div className="bg-green-100 rounded-full p-3 mr-4">
                  <GiftIcon className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Prize Found!</h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                You've discovered {tempPrize?.type === 'moxie' 
                  ? <span className="font-semibold text-green-600">{tempPrize.value} MOXIE</span>
                  : <span className="font-semibold text-yellow-600">1 {tempPrize?.token} Fan Token</span>
                }. 
                Do you want to claim it now or keep hunting?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center"
                  onClick={() => handleConfirm(false)}
                >
                  <ArrowPathIcon className="h-5 w-5 mr-2" />
                  Keep Hunting
                </button>
                <button
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center"
                  onClick={() => handleConfirm(true)}
                >
                  <GiftIcon className="h-5 w-5 mr-2" />
                  Claim Prize
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
        {showNewGameConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-md w-full m-4 shadow-2xl"
            >
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 rounded-full p-3 mr-4">
                  <SparklesIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Game Over!</h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                You've used all your guesses. What would you like to do?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 flex items-center"
                  onClick={revealAllBoxes}
                >
                  <GiftIcon className="h-5 w-5 mr-2" />
                  Reveal All
                </button>
                <button
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center"
                  onClick={() => handleNewGameConfirm(true)}
                >
                  <ArrowPathIcon className="h-5 w-5 mr-2" />
                  New Game
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
        {showResetConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-md w-full m-4 shadow-2xl"
            >
              <div className="flex items-center mb-6">
                <div className="bg-yellow-100 rounded-full p-3 mr-4">
                  <ArrowPathIcon className="h-8 w-8 text-yellow-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Reset Game?</h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Are you sure you want to reset the game? This will clear the current grid but keep your balances.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center"
                  onClick={() => confirmResetGame(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors duration-200 flex items-center"
                  onClick={() => confirmResetGame(true)}
                >
                  Reset Game
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showNewGameConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-md w-full m-4 shadow-2xl"
            >
              <div className="flex items-center mb-6">
                <div className="bg-green-100 rounded-full p-3 mr-4">
                  <SparklesIcon className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800">New Game?</h2>
              </div>
              <p className="text-lg text-gray-600 mb-8">
                Are you sure you want to start a new game? This will reset the grid and clear all your balances.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors duration-200 flex items-center"
                  onClick={() => confirmNewGame(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center"
                  onClick={() => confirmNewGame(true)}
                >
                  New Game
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App