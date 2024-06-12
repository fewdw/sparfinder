'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Cookies from 'js-cookie';
import MenuBar from '@/app/components/MenuBar';
import { GET_BOXER_BY_ID, VIEW_COACH_EVENTS_NAME_AND_IDs, INVITE_BOXER_TO_EVENT } from "@/app/utils/apiConfig";

const BoxerPage = () => {
    const params = useParams();
    const [boxer, setBoxer] = useState(null);
    const [accountType, setAccountType] = useState('');
    const [coachEvents, setCoachEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [inviteResult, setInviteResult] = useState('');

    useEffect(() => {
        const fetchBoxer = async () => {
            try {
                const response = await fetch(`${GET_BOXER_BY_ID}/${params.boxer_id}`);
                const data = await response.json();
                setBoxer(data);
            } catch (error) {
                console.error('Error fetching the boxer:', error);
            }
        };

        const checkAccountType = () => {
            const JWT = Cookies.get('jwt');
            if (JWT) {
                const decoded = JSON.parse(atob(JWT.split('.')[1]));
                setAccountType(decoded.account_type);
            }
        };

        fetchBoxer();
        checkAccountType();
    }, [params.boxer_id]);

    useEffect(() => {
        if (accountType === 'coach') {
            fetchCoachEvents();
        }
    }, [accountType]);

    const fetchCoachEvents = async () => {
        const JWT = Cookies.get('jwt');
        try {
            const response = await fetch(VIEW_COACH_EVENTS_NAME_AND_IDs, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ JWT })
            });
            const events = await response.json();
            setCoachEvents(events);
        } catch (error) {
            console.error('Error fetching coach events:', error);
        }
    };

    const handleInvite = async () => {
        const JWT = Cookies.get('jwt');
        if (selectedEvent) {
            try {
                const response = await fetch(INVITE_BOXER_TO_EVENT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        JWT,
                        event_id: selectedEvent,
                        boxer_id: params.boxer_id
                    })
                });
                const result = await response.json();
                setInviteResult(result.result); // Display result next to the button
            } catch (error) {
                console.error('Error inviting boxer to event:', error);
                setInviteResult('Failed to send invitation.'); // Display error message if failed
            }
        } else {
            setInviteResult("Please select an event first.");
        }
    };

    return (
        <div>
            <MenuBar />
            {boxer ? (
                <div>
                    <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm m-8">
                        <dl className="-my-3 divide-y divide-gray-100 text-sm">
                            {Object.entries({
                                'First Name': boxer.fname,
                                'Last Name': boxer.lname,
                                'Birth Date': boxer.birth_date,
                                'Country': boxer.country,
                                'Gender': boxer.gender,
                                'Gym ID': boxer.gym_id,
                                'Level': boxer.level,
                                'Number of Fights': boxer.num_of_fights,
                                'Stance': boxer.stance,
                                'Weight': boxer.weight
                            }).map(([key, value]) => (
                                <div key={key} className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">{key}</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    
                    {accountType === 'coach' && (
                        <div className="m-8">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Invite {boxer.fname} to one of your events
                            </h3>
                            <div className="mt-2">
                                <label className="block text-sm font-medium text-gray-700">Choose event</label>
                                <select
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    value={selectedEvent}
                                    onChange={e => setSelectedEvent(e.target.value)}
                                >
                                    <option value="" disabled>Select event</option>
                                    {coachEvents.map(event => (
                                        <option key={event.uuid} value={event.uuid}>{event.name}</option>
                                    ))}
                                </select>
                                <button
                                    onClick={handleInvite}
                                    className="mt-4 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Invite to Event
                                </button>
                                {inviteResult && <span className="ml-4 text-sm text-gray-600">{inviteResult}</span>}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default BoxerPage;