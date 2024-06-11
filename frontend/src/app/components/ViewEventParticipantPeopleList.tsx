import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation"; // Correct hook for App Router
import { EVENT_BELONGS_TO_COACH } from "../utils/apiConfig";
import ViewEventParticipantPeopleListEvenrOwnerView from './ViewEventParticipantPeopleListEvenrOwnerView';
import ViewEventParticipantPeopleListNotEventView from './ViewEventParticipantPeopleListNotEventView';

const ViewEventParticipantPeopleList = ({ eventId }) => {
  const [userStatus, setUserStatus] = useState('loading'); // 'loading', 'notYourEvent', 'yourEvent', 'redirect'
  const router = useRouter();

  useEffect(() => {
    const checkEventOwnership = async () => {
      const JWT = Cookies.get('jwt');

      // Redirect if JWT is not available
      if (!JWT) {
        router.push('/');
        return;
      }

      try {
        const response = await fetch(EVENT_BELONGS_TO_COACH, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ JWT, event_id: eventId })
        });
        const data = await response.json();
        if (response.ok && data.result) {
          setUserStatus('yourEvent');
        } else {
          setUserStatus('notYourEvent');
        }
      } catch (error) {
        console.error('API error:', error);
        setUserStatus('notYourEvent');
      }
    };

    checkEventOwnership();
  }, [eventId, router]);

  if (userStatus === 'loading') {
    return <p>Loading...</p>;
  }

  if (userStatus === 'redirect') {
    return null;
  }

  return (
    <div>
      {userStatus === 'yourEvent' && <p><ViewEventParticipantPeopleListEvenrOwnerView eventId={eventId} /> </p>}
      {userStatus === 'notYourEvent' && <p><ViewEventParticipantPeopleListNotEventView eventId={eventId} /> </p>}
    </div>
  );
}

export default ViewEventParticipantPeopleList;
