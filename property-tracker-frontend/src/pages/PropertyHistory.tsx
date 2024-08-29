import React, {useState} from 'react';

const PropertyHistory: React.FC = () => {
  const [propertyID, setPropertyID] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Blockchain interaction will be added here in the future
    console.log('Fetching History for Property ID:', propertyID);
    // Placeholder history data
    setHistory([
      'Owner1 -> Owner2 (01/01/2020)',
      'Owner2 -> Owner3 (02/02/2021)',
      'Owner3 -> Owner4 (03/03/2022)',
    ]);
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
