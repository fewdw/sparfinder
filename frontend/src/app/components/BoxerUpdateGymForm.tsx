import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const BoxerUpdateGymForm = () => {
  const [currentGym, setCurrentGym] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gyms, setGyms] = useState([]);
  const [selectedGymId, setSelectedGymId] = useState('');

  useEffect(() => {
    const jwtToken = Cookies.get('jwt');
    const fetchCurrentGym = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/sparfinder/api/boxer/gym/name', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ JWT: jwtToken })
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch current gym');
        }
        if (data.name) {
          setCurrentGym(data.name);
        } else {
          setError('No gym found for this boxer.');
        }
      } catch (error) {
        console.error('Error fetching current gym:', error);
        setError(error.message);
      }
    };

    const fetchAllGyms = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/sparfinder/api/gym/gyms');
        const data = await response.json();
        if (!response.ok) {
          throw new Error('Failed to fetch gyms');
        }
        setGyms(data);
      } catch (error) {
        console.error('Error fetching gyms:', error);
        setGyms([]);
      }
    };

    fetchCurrentGym();
    fetchAllGyms();
    setLoading(false);
  }, []);

  const handleAssociate = async () => {
    const jwtToken = Cookies.get('jwt');
    try {
      const response = await fetch('http://127.0.0.1:5000/sparfinder/api/boxer/gym', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ JWT: jwtToken, gym_id: selectedGymId })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to associate with gym');
      }
      setCurrentGym(gyms.find(gym => gym.UUID === selectedGymId).name); // Update the current gym name on the frontend
      alert('Gym chosen successfully.');
    } catch (error) {
      console.error('Error associating with gym:', error);
      alert('Failed to associate with gym: ' + error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
      <dl className="-my-3 divide-y divide-gray-100 text-sm">
        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Your Current Gym</dt>
          <dd className="text-gray-700 sm:col-span-2">{currentGym || error}</dd>
        </div>
        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Choose a Gym</dt>
          <dd className="text-gray-700 sm:col-span-2">
            <select
              value={selectedGymId}
              onChange={(e) => setSelectedGymId(e.target.value)}
              disabled={gyms.length === 0}
              className="rounded border-gray-200 p-2"
            >
              <option value="">Select a gym</option>
              {gyms.map((gym) => (
                <option key={gym.UUID} value={gym.UUID}>{gym.name}</option>
              ))}
            </select>
            <button
              onClick={handleAssociate}
              disabled={!selectedGymId}
              className="ml-4 inline-block rounded bg-red-950 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-red-800"
            >
              Associate
            </button>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default BoxerUpdateGymForm;
