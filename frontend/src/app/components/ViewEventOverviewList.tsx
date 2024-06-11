import React, { useEffect, useState } from 'react';
import { GET_SINGLE_EVENT_INFO_TO_MODIFY } from "../utils/apiConfig";

const ViewEventOverviewList = ({ eventId }) => {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`${GET_SINGLE_EVENT_INFO_TO_MODIFY}${eventId}`);
        const data = await response.json();
        if (response.ok) {
          setEventData(data);
        } else {
          throw new Error('Failed to load event data');
        }
      } catch (err) {
        setError(err.message);
        console.error('Fetch error:', err);
      }
      setLoading(false);
    };

    fetchEventData();
  }, [eventId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!eventData) return <p>No event data available.</p>;

  return (
    <div className="mx-auto w-full max-w-3xl mt-4">
        <h2 className="text-lg font-semibold text-gray-900">Event Overview</h2>
      <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm">
        <dl className="-my-3 divide-y divide-gray-100 text-sm">
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Name</dt>
            <dd className="text-gray-700 sm:col-span-2">{eventData.name}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Date and Time</dt>
            <dd className="text-gray-700 sm:col-span-2">{`${eventData.date} at ${eventData.time}`}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Location</dt>
            <dd className="text-gray-700 sm:col-span-2">{eventData.location}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Duration (hours)</dt>
            <dd className="text-gray-700 sm:col-span-2">{eventData.length_time}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Max Participants</dt>
            <dd className="text-gray-700 sm:col-span-2">{eventData.max_participants}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Description</dt>
            <dd className="text-gray-700 sm:col-span-2">{eventData.description}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Private Event</dt>
            <dd className="text-gray-700 sm:col-span-2">{eventData.private ? 'Yes' : 'No'}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ViewEventOverviewList;
