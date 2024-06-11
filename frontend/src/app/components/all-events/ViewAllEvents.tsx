import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import {GET_ALL_EVENTS_EVENTS_PAGE_FUTURE, GET_ALL_EVENTS_EVENTS_PAGE_PAST} from '../../utils/apiConfig'

const ViewAllEvents = () => {
  const [activeTab, setActiveTab] = useState('future');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    const url = activeTab === 'future'
      ? GET_ALL_EVENTS_EVENTS_PAGE_FUTURE
      : GET_ALL_EVENTS_EVENTS_PAGE_PAST;
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [activeTab]);

  return (
    <div className='mt-4'>
      <div className="sm:hidden">
        <select id="eventTab" className="w-full rounded-md border-gray-200 p-2" value={activeTab} onChange={(e) => setActiveTab(e.target.value)}>
          <option value="future">Future Events</option>
          <option value="past">Past Events</option>
        </select>
      </div>

      <div className="hidden sm:block">
        <nav className="border-b border-gray-200 -mb-px flex justify-center gap-6">
          <button onClick={() => setActiveTab('future')} className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${activeTab === 'future' ? 'border-sky-500 text-sky-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>Future Events</button>
          <button onClick={() => setActiveTab('past')} className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${activeTab === 'past' ? 'border-sky-500 text-sky-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>Past Events</button>
        </nav>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
          {events.map(event => <EventCard key={event.uuid} event={event} />)}
        </div>
      )}
    </div>
  );
};

export default ViewAllEvents;
