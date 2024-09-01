import React, {useState} from 'react';
import usePropertyRegistry from '../hooks/usePropertyRegistry';
import {useGlobalContext} from '../contexts/GlobalContext';

const PropertyHistory: React.FC = () => {
  const {contract} = usePropertyRegistry();
  const [propertyID, setPropertyID] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const {setLoading} = useGlobalContext();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // Blockchain interaction will be added here in the future
    if (contract) {
      try {
        setLoading(true);
        const historyData = await contract.methods
          .getOwnershipHistory(propertyID)
          .call();
        historyData
          ? setHistory(historyData)
          : console.log('History data is unavailable');
        console.log('Ownership History:', historyData);
      } catch (err) {
        console.error('Error fetching history:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>
        View Property Ownership History
      </h2>
      <form
        onSubmit={handleSearch}
        className='space-y-4'
      >
        <div>
          <label className='block text-gray-700'>Property ID</label>
          <input
            type='text'
            value={propertyID}
            onChange={(e) => setPropertyID(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          Search History
        </button>
      </form>
      {history.length > 0 && (
        <div className='mt-4'>
          <h3 className='text-xl font-semibold'>Ownership History:</h3>
          <ul className='list-disc pl-5'>
            {history.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PropertyHistory;
