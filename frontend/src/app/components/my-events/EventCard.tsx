import React from 'react';
import { useRouter } from "next/navigation"; // Correct hook for App Router
import Link from 'next/link';

const EventCard = ({ event }) => {
    const router = useRouter();


  return (
    <Link href={`/events/${event.uuid}`} className="block rounded-lg p-4 shadow-sm shadow-indigo-100">


      <div className="mt-2">
        <dl>
          <div>
            <dt className="sr-only">Event Name</dt>
            <dd className="font-medium">{event.name}</dd>
          </div>

          <div>
            <dt className="sr-only">Location</dt>
            <dd className="text-sm text-gray-500">{event.location}</dd>
          </div>

          <div>
            <dt className="sr-only">Description</dt>
            <dd className="text-sm text-gray-500">{event.description}</dd>
          </div>
        </dl>
      </div>
    </Link>
  );
};

export default EventCard;
