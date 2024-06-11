import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {GET_LIST_OF_PARTICIPANTS} from '../utils/apiConfig';

const ViewEventParticipantPeopleListNotEventView = ({ eventId }) => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await fetch(`${GET_LIST_OF_PARTICIPANTS}/${eventId}`);
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
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Links</th>
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
                <Link href={`/find/boxers/boxer/${participant.UUID}`}>
                  <p className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                    View Profile
                  </p>
                </Link>
                {participant.gym_id ? (
                  <Link href={`/find/gyms/gym/${participant.gym_id}`}>
                    <p className="inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium text-white hover:bg-green-700">
                      View Gym
                    </p>
                  </Link>
                ) : (
                  <span>User has no gym</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEventParticipantPeopleListNotEventView;
