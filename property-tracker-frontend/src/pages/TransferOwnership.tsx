import React, {useState} from 'react';

const TransferOwnership: React.FC = () => {
  const [propertyID, setPropertyID] = useState('');
  const [newOwnerName, setNewOwnerName] = useState('');

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    // Blockchain interaction will be added here in the future
    console.log('Ownership Transferred:', {propertyID, newOwnerName});
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Transfer Property Ownership</h2>
      <form
        onSubmit={handleTransfer}
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
        <div>
          <label className='block text-gray-700'>New Owner Name</label>
          <input
            type='text'
            value={newOwnerName}
            onChange={(e) => setNewOwnerName(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          Transfer Ownership
        </button>
      </form>
    </div>
  );
};

export default TransferOwnership;
