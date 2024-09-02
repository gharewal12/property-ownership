import React, { useState } from 'react';
import usePropertyRegistry from '../hooks/usePropertyRegistry';
import { useGlobalContext } from '../contexts/GlobalContext';
import { motion } from 'framer-motion';

const TransferOwnership: React.FC = () => {
  const { contract, account, web3 } = usePropertyRegistry();
  const [propertyID, setPropertyID] = useState('');
  const [newOwnerName, setNewOwnerName] = useState('');
  const [newOwnerAddress, setNewOwnerAddress] = useState('');
  const { setLoading, setAlert } = useGlobalContext();

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate the new owner address
    if (web3 && !web3.utils.isAddress(newOwnerAddress)) {
      setAlert({
        open: true,
        message: `Invalid Ethereum address: ${newOwnerAddress}`,
        severity: 'error',
      });
      return;
    }
    if (contract && account) {
      try {
        setLoading(true);
        await contract.methods
          .transferOwnership(propertyID, newOwnerName, newOwnerAddress)
          .send({
            from: account,
          });
        setAlert({
          open: true,
          message: 'Ownership transferred successfully',
          severity: 'success',
        });
      } catch (err) {
        setAlert({
          open: true,
          message: 'Error occurred while transferring ownership',
          severity: 'error',
        });
        console.error('Error transferring ownership:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <motion.h2
        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Transfer Property Ownership
      </motion.h2>
      <motion.form
        onSubmit={handleTransfer}
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-lg font-semibold">New Owner Name</label>
          <input
            type="text"
            value={newOwnerName}
            onChange={(e) => setNewOwnerName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-lg font-semibold">New Owner Address</label>
          <input
            type="text"
            value={newOwnerAddress}
            onChange={(e) => setNewOwnerAddress(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>
        <motion.button
          type="submit"
          className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full text-lg font-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Transfer Ownership
        </motion.button>
      </motion.form>
    </div>
  );
};

export default TransferOwnership;
