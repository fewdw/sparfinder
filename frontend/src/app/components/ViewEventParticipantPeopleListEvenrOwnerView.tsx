import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

const ViewEventParticipantPeopleListEventOwnerView = ({ eventId }) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/sparfinder/api/event/participants/${eventId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setParticipants(data);
      } catch (error) {
        setError('Failed to fetch data: ' + error.message);
        console.error('API error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [eventId]);

  const handleDelete = async (boxerId) => {
    const JWT = Cookies.get('jwt');
    try {
      const response = await fetch('http://127.0.0.1:5000/sparfinder/api/event/participants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          JWT,
          event_id: eventId,
          boxer_id: boxerId
        })
      });
      if (!response.ok) {
        throw new Error('Failed to delete the participant');
      }
      // Update participants state to remove the deleted participant
      setParticipants(prevParticipants => prevParticipants.filter(participant => participant.UUID !== boxerId));
    } catch (error) {
      setError('Failed to delete participant: ' + error.message);
      console.error('API error:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Full Name</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Country</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Birth Date</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Gender</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Level</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Stance</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Weight</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Fights</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {participants.map(participant => (
            <tr key={participant.UUID}>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{participant.fname} {participant.lname}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{participant.country}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{participant.birth_date}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{participant.gender}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{participant.level}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{participant.stance}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{participant.weight}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{participant.num_of_fights}</td>
              <td className="whitespace-nowrap px-4 py-2 flex gap-2">
                <button
                  onClick={() => handleDelete(participant.UUID)}
                  className="rounded bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEventParticipantPeopleListEventOwnerView;
