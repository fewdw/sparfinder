import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { GET_EVENT_WAITING_LIST, APPROVE_BOXER_WAITLIST, REMOVE_BOXER_FROM_WAITLIST} from '../utils/apiConfig';
import Link from 'next/link';

const CoachViewEventWaitingPeopleList = ({ eventId }: { eventId: string }) => {
  const [waitingList, setWaitingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWaitingList();
  }, [eventId]);

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
      setError('Failed to load waiting list: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action: string, boxerId: string) => {
    const JWT = Cookies.get('jwt');
    const url = action === 'approve' 
      ? `${APPROVE_BOXER_WAITLIST}/${eventId}`
      : `${REMOVE_BOXER_FROM_WAITLIST}/${eventId}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ JWT, boxer_id: boxerId })
      });
      const result = await response.json();
      if (!result.error) {
        setWaitingList(prev => prev.filter((person: { UUID: string }) => person.UUID !== boxerId));
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Failed to perform action: ' + (error as Error).message);
    }
  };

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
            <tr key={(person as { UUID: string }).UUID}>
  <td className="px-4 py-2 font-medium text-gray-900">{(person as { fname: string; lname: string }).fname} {(person as { fname: string; lname: string }).lname}</td>
  <td className="px-4 py-2 text-gray-700">{(person as { birth_date: string }).birth_date}</td>
  <td className="px-4 py-2 text-gray-700">{(person as { country: string }).country}</td>
  <td className="px-4 py-2 text-gray-700">{(person as { gender: string }).gender}</td>
  <td className="px-4 py-2 text-gray-700">{(person as { level: string }).level}</td>
  <td className="px-4 py-2 text-gray-700">{(person as { stance: string }).stance}</td>
  <td className="px-4 py-2 text-gray-700">{(person as { weight: string }).weight} lbs</td>
  <td className="px-4 py-2 text-gray-700">{(person as { num_of_fights: string }).num_of_fights}</td>

              <td className="px-4 py-2">
                <div className="flex space-x-2">
                <Link href={`/find/boxers/boxer/${(person as { UUID: string }).UUID}`} className="rounded bg-blue-500 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700">View Boxer Page</Link>
                <Link href={`/find/gyms/gym/${(person as { gym_id: string }).gym_id}`} className="rounded bg-blue-500 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700">View Gym Page</Link>
                <button onClick={() => handleAction('approve', (person as { UUID: string }).UUID)} className="rounded bg-green-500 px-4 py-2 text-xs font-medium text-white hover:bg-green-700">Approve</button>
                <button onClick={() => handleAction('remove', (person as { UUID: string }).UUID)} className="rounded bg-red-500 px-4 py-2 text-xs font-medium text-white hover:bg-red-700">Remove</button>
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
