import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const CoachViewEventInvitedPeopleList = ({ eventId }) => {
  const [invitedBoxers, setInvitedBoxers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvitedBoxers = async () => {
      const JWT = Cookies.get('jwt');
      if (!JWT) {
        setError('JWT not found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:5000/sparfinder/api/event/invite/list', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ JWT, event_id: eventId })
        });
        if (!response.ok) throw new Error('Failed to fetch invited boxers.');
        const data = await response.json();
        setInvitedBoxers(data);
      } catch (error) {
        setError(`Error fetching invited boxers: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitedBoxers();
  }, [eventId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Invited Boxers List</h2>
      {invitedBoxers.length > 0 ? (
        invitedBoxers.map(boxer => (
          <div key={boxer.UUID} className="border rounded-md p-4 my-2">
            <p>Last Name: {boxer.lname}</p>
            <p>Birth Date: {boxer.birth_date}</p>
            <p>Country: {boxer.country}</p>
            <p>Level: {boxer.level}</p>
            <p>Stance: {boxer.stance}</p>
            <p>Weight: {boxer.weight} lbs</p>
            <p>Number of Fights: {boxer.num_of_fights}</p>
            <div className="flex justify-between items-center">
              <div>
                <a href={`/find/boxers/boxer/${boxer.UUID}`} className="text-blue-600 hover:text-blue-800">View Profile</a>
                <span> | </span>
                <a href={`/find/gyms/gym/${boxer.gym_id}`} className="text-blue-600 hover:text-blue-800">View Gym</a>
              </div>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Remove Invite
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No boxers invited yet.</p>
      )}
    </div>
  );
};

export default CoachViewEventInvitedPeopleList;
