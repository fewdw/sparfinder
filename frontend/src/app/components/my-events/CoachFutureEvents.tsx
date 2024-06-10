import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import Cookies from 'js-cookie';
import { VIEW_COACH_FUTURE_EVENTS, DELETE_EVENT } from '../../utils/apiConfig';
import FutureEventCard from './FutureEventCard';

const CoachFutureEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const JWT = Cookies.get('jwt');
    const response = await fetch(VIEW_COACH_FUTURE_EVENTS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ JWT })
    });
    const data = await response.json();
    if (response.ok) {
      setEvents(data);
    } else {
      console.error('Failed to fetch future events');
    }
  };

  const handleDelete = async (uuid) => {
    const JWT = Cookies.get('jwt');
    const response = await fetch(DELETE_EVENT, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ JWT, event_id: uuid })
    });
    if (response.ok) {
      setEvents(events.filter(event => event.uuid !== uuid));
      alert('Event deleted successfully');
    } else {
      console.error('Failed to delete the event');
    }
  };

  return (
    <div>
      {events.map(event => (
        <FutureEventCard key={event.uuid} event={event} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default CoachFutureEvents;
