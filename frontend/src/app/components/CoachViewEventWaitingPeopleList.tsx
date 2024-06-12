import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {GET_EVENT_WAITING_LIST} from '../utils/apiConfig';

const CoachViewEventWaitingPeopleList = ({ eventId }) => {
  const [waitingList, setWaitingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWaitingList = async () => {
      const JWT = Cookies.get('jwt');
      if (!JWT) {
        setError('No JWT found, please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${GET_EVENT_WAITING_LIST}/${eventId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ JWT })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch waiting list');
        }

        const data = await response.json();
        setWaitingList(data);
      } catch (error) {
        setError('Failed to load waiting list: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWaitingList();
  }, [eventId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 font-medium text-gray-900">Full Name</th>
            <th className="px-4 py-2 font-medium text-gray-900">Birth Date</th>
            <th className="px-4 py-2 font-medium text-gray-900">Country</th>
            <th className="px-4 py-2 font-medium text-gray-900">Gender</th>
            <th className="px-4 py-2 font-medium text-gray-900">Level</th>
            <th className="px-4 py-2 font-medium text-gray-900">Stance</th>
            <th className="px-4 py-2 font-medium text-gray-900">Weight</th>
            <th className="px-4 py-2 font-medium text-gray-900">Fights</th>
            <th className="px-4 py-2 font-medium text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {waitingList.map(person => (
            <tr key={person.UUID}>
              <td className="px-4 py-2 font-medium text-gray-900">{person.fname} {person.lname}</td>
              <td className="px-4 py-2 text-gray-700">{person.birth_date}</td>
              <td className="px-4 py-2 text-gray-700">{person.country}</td>
              <td className="px-4 py-2 text-gray-700">{person.gender}</td>
              <td className="px-4 py-2 text-gray-700">{person.level}</td>
              <td className="px-4 py-2 text-gray-700">{person.stance}</td>
              <td className="px-4 py-2 text-gray-700">{person.weight} lbs</td>
              <td className="px-4 py-2 text-gray-700">{person.num_of_fights}</td>
              <td className="px-4 py-2">
                <div className="flex space-x-2">
                  <a href={`/find/boxers/boxer/${person.UUID}`} className="rounded bg-blue-500 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700">View Boxer Page</a>
                  <a href={`/find/gyms/gym/${person.gym_id}`} className="rounded bg-blue-500 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700">View Gym Page</a>
                  <button className="rounded bg-green-500 px-4 py-2 text-xs font-medium text-white hover:bg-green-700">Approve</button>
                  <button className="rounded bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-700">Remove</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoachViewEventWaitingPeopleList;
