import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-5rem)] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'>
      {/* Central Card */}
      <motion.div
        className='bg-white p-10 rounded-3xl shadow-2xl max-w-4xl w-full mx-4'
        initial={{opacity: 0, scale: 0.9}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.8, ease: 'easeOut'}}
      >
        {/* Header */}
        <motion.h1
          className='text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-center mb-10'
          initial={{opacity: 0, y: -50}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8, ease: 'easeOut'}}
        >
          Property Tracker
        </motion.h1>

        {/* Summary Section */}
        <motion.div
          initial={{opacity: 0, scale: 0.95}}
          animate={{opacity: 1, scale: 1}}
          transition={{duration: 0.8, ease: 'easeOut'}}
        >
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800 text-center mb-6'>
            Decentralized Property Ownership
          </h2>
          <p className='text-lg md:text-xl text-gray-600 text-center mb-10'>
            Experience the future of property management with our
            blockchain-powered solution. Secure, transparent, and immutable
            records ensure that your property ownership is protected and easily
            transferable. Say goodbye to fraud and hello to peace of mind.
          </p>
          <div className='flex justify-center'>
            <motion.button
              className='bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 shadow-lg'
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
              onClick={() => navigate('/register')}
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
