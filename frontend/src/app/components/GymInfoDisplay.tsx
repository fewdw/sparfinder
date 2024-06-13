import React from 'react';
import Cookies from 'js-cookie';
import { UPDATE_OR_DELETE_COACH_GYM } from '../utils/apiConfig';

const GymInfoDisplay = ({ gym, onDeleteSuccess }: { gym: any, onDeleteSuccess: () => void }) => {
  const handleDelete = async () => {
    const jwtToken = Cookies.get('jwt');
    if (!jwtToken) {
      alert('JWT token is missing');
      return;
    }

    try {
      const response = await fetch(UPDATE_OR_DELETE_COACH_GYM, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ JWT: jwtToken })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete gym');
      }

      alert('Gym deleted successfully');
      if (onDeleteSuccess) {
        onDeleteSuccess(); // Call the onDeleteSuccess function if it's provided
      }
      // Optionally, update the state to reflect the deletion or navigate away
    } catch (error) {
      console.error('Error deleting gym:', error);
      alert('Failed to delete gym: ' + (error as Error).message);
    }
  };

  return (
    <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
      <dl className="-my-3 divide-y divide-gray-100 text-sm">
        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Gym Name</dt>
          <dd className="text-gray-700 sm:col-span-2">{gym.name}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Address</dt>
          <dd className="text-gray-700 sm:col-span-2">{gym.address}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Level</dt>
          <dd className="text-gray-700 sm:col-span-2">{gym.level || "Not specified"}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
          <dt className="font-medium text-gray-900">Delete Gym</dt>
          <dd className="text-gray-700 sm:col-span-2">
            <button
              onClick={handleDelete}
              className="rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white"
            >
              Delete Gym
            </button>
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default GymInfoDisplay;
