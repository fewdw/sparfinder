import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import GymInfoDisplay from './GymInfoDisplay';
import CreateGymForm from './CreateGymForm';
import { GET_COACH_GYM } from '../utils/apiConfig';

const CoachProfileCRUDgym = () => {
  const [gym, setGym] = useState(null);
  const [hasGym, setHasGym] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGymData = async () => {
      const jwtToken = Cookies.get('jwt');
      try {
        const response = await fetch(GET_COACH_GYM, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ JWT: jwtToken }),
        });
        const data = await response.json();
        if (!response.ok && data.error) {
          throw new Error(data.error);
        }
        if (data.error && data.error === "No gym found for this coach") {
          setHasGym(false);
        } else {
          setGym(data);
          setHasGym(true);
        }
      } catch (error) {
        console.error('Error fetching gym data:', error);
        setHasGym(false);
      }
      setLoading(false);
    };

    fetchGymData();
  }, []);

  const handleDeleteSuccess = () => {
    setGym(null);
    setHasGym(false);
    alert('Gym deleted successfully.');
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : hasGym ? (
        <GymInfoDisplay gym={gym} onDeleteSuccess={handleDeleteSuccess} />
      ) : (
        <CreateGymForm />
      )}
    </div>
  );
};

export default CoachProfileCRUDgym;
