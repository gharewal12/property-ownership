import React, { useState } from 'react';
import usePropertyRegistry from '../hooks/usePropertyRegistry';
import { useGlobalContext } from '../contexts/GlobalContext';
import { motion } from 'framer-motion';

const PropertyHistory: React.FC = () => {
  const { contract } = usePropertyRegistry();
  const [propertyID, setPropertyID] = useState('');
  const [history, setHistory] = useState<{owner: string, date:string}[]>([]);
  const { setLoading, setAlert } = useGlobalContext();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contract) {
      try{
          setLoading(true);
          const data = await contract?.methods
            .getOwnershipHistory(propertyID)
            .call();
            const {'0' : owners, '1' : dates} = data as any;
            const historyData = owners?.map((owner:string, index: number)=>({
              owner,
              date: new Date( Number(dates[index]) *1000).toLocaleDateString('en-US',{year:'numeric', month:'short', day:'2-digit'})
            }))
          if (historyData && historyData?.length > 0) {
            setHistory(historyData);
            setAlert({
              open: true,
              message: 'History retrieved successfully',
              severity: 'success',
            });
          } else {
            setHistory([]);
            setAlert({
              open: true,
              message: 'No history found for this property',
              severity: 'info',
            });
          }
      } catch (err) {
        setAlert({
          open: true,
          message: 'Error fetching history',
          severity: 'error',
        });
        console.error('Error fetching history:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <motion.h2
        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        View Property Ownership History
      </motion.h2>
      <motion.form
        onSubmit={handleSearch}
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>
        <motion.button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 w-full text-lg font-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Search History
        </motion.button>
      </motion.form>
      {history.length > 0 && (
        <motion.div
          className="mt-6 bg-gray-50/5 p-6 rounded-lg shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        >
          <h3 className="text-2xl font-semibold mb-4">Ownership History:</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {history.map((entry, index) => (
              <li key={index}>
                <div className='flex justify-between'>
                  <div>{entry.owner}</div>
                  <div>{entry.date}</div>
                </div>
                </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default PropertyHistory;
