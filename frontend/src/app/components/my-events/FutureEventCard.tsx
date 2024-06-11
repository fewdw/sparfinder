import React from 'react';
import Link from 'next/link';

const FutureEventCard = ({ event, onDelete }) => {
  const handleDelete = () => {
    onDelete(event.uuid);
  };

  return (
    <div className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
      <div className="flex justify-between items-center">
        <h2 className="font-medium">{event.name}</h2>
        <div>
          <Link href={`/events/${event.uuid}`}>
            <p className="mr-2 p-2 text-blue-500 hover:text-blue-700">View Events Page</p>
          </Link>
          <button onClick={handleDelete} className="p-2 text-red-500 hover:text-red-700">Delete</button>
        </div>
      </div>
      <p className="text-sm text-gray-500">{event.description}</p>
      <p className="text-sm text-gray-500">{event.location}</p>
    </div>
  );
};

export default FutureEventCard;
