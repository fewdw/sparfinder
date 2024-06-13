import React from 'react';
import Link from 'next/link';

const EventCard = ({ event }: {event: any}) => {
  const progressPercentage = (event.participants_count / event.max_participants) * 100;

  return (
    <Link href={`/events/${event.uuid}`} passHref>
      <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 cursor-pointer hover:shadow-lg transition-shadow">

        <div className="sm:flex sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
              {event.name}
            </h3>
            <p className="mt-1 text-xs font-medium text-gray-600">Location: {event.location}</p>
          </div>
        </div>

        <div>
          <div>
          <p className='text-sm'>{event.participants_count}/{event.max_participants} Participants</p>

            <span id="ProgressLabel" className="sr-only">Event Participation</span>
            <span
              role="progressbar"
              aria-labelledby="ProgressLabel"
              aria-valuenow={progressPercentage}
              className="block w-full rounded-full bg-gray-200"
            >
              <span className="block h-3 rounded-full bg-red-600" style={{width: `${progressPercentage}%`}}></span>
            </span>
          </div>
          <p className="text-sm text-gray-500">{event.description}</p>

        </div>
      </div>
    </Link>
  );
};

export default EventCard;
