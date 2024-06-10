import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import Cookies from 'js-cookie';
import { VIEW_COACH_PAST_EVENTS } from '../../utils/apiConfig';


const CoachPastEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const JWT = Cookies.get('jwt');
      const response = await fetch(VIEW_COACH_PAST_EVENTS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ JWT })
      });
      const data = await response.json();
      if (response.ok) {
        setEvents(data);
      } else {
        console.error('Failed to fetch past events');
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      {events.map(event => (
        <EventCard key={event.uuid} event={event} />
      ))}
    </div>
  );
};

export default CoachPastEvents;
