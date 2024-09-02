import React, { useState } from 'react';
import usePropertyRegistry from '../hooks/usePropertyRegistry';
import { useGlobalContext } from '../contexts/GlobalContext';
import { motion } from 'framer-motion';

const RegisterProperty: React.FC = () => {
  const { contract, account } = usePropertyRegistry();
  const [propertyID, setPropertyID] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [location, setLocation] = useState('');
  const [documentHash, setDocumentHash] = useState('');
  const { setLoading, setAlert } = useGlobalContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contract && account) {
      setLoading(true);
      try {
        await contract.methods
          .registerProperty(propertyID, location, ownerName, documentHash)
          .send({
            from: account,
          });
        setAlert({
          open: true,
          message: 'Property registered successfully',
          severity: 'success',
        });
      } catch (err) {
        setAlert({
          open: true,
          message: 'Error occurred while registering property',
          severity: 'error',
        });
        console.error('Error registering property:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <motion.h2
        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Register a New Property
      </motion.h2>
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      >
        <div>
          <label className="block text-gray-700 text-lg font-semibold">Property ID</label>
          <input
            type="text"
            value={propertyID}
            onChange={(e) => setPropertyID(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-lg font-semibold">Owner Name</label>
          <input
            type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-lg font-semibold">Property Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-lg font-semibold">Document Hash</label>
          <input
            type="text"
            value={documentHash}
            onChange={(e) => setDocumentHash(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <motion.button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full text-lg font-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Register Property
        </motion.button>
      </motion.form>
    </div>
  );
};

export default RegisterProperty;
