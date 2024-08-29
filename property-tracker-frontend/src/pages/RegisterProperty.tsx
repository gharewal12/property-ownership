import React, {useState} from 'react';

const RegisterProperty: React.FC = () => {
  const [propertyID, setPropertyID] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [location, setLocation] = useState('');
  const [documentHash, setDocumentHash] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Blockchain interaction will be added here in the future
    console.log('Property Registered:', {
      propertyID,
      ownerName,
      location,
      documentHash,
    });
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>Register a New Property</h2>
      <form
        onSubmit={handleSubmit}
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
          <label className='block text-gray-700'>Owner Name</label>
          <input
            type='text'
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>
        <div>
          <label className='block text-gray-700'>Property Location</label>
          <input
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>
        <div>
          <label className='block text-gray-700'>Document Hash</label>
          <input
            type='text'
            value={documentHash}
            onChange={(e) => setDocumentHash(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded'
            required
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          Register Property
        </button>
      </form>
    </div>
  );
};

export default RegisterProperty;
