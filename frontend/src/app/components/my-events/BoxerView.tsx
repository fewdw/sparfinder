import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import MenuBar from '../MenuBar';
import Link from 'next/link';

const BoxerView = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const JWT = Cookies.get('jwt');
        if (!JWT) {
            setError('JWT not found. Please log in.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/sparfinder/api/event/boxer/view/participating', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ JWT })
            });
            if (!response.ok) throw new Error('Failed to fetch events.');
            const data = await response.json();
            setEvents(data);
            setLoading(false);
        } catch (error) {
            setError(`Error fetching events: ${error.message}`);
            setLoading(false);
        }
    };

    const handleLeaveEvent = async (eventUuid) => {
        const JWT = Cookies.get('jwt');
        try {
            const response = await fetch('http://127.0.0.1:5000/sparfinder/api/event/boxer/leave/participating', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ JWT, event_id: eventUuid })
            });
            if (response.ok) {
                setEvents(prevEvents => prevEvents.filter(event => event.uuid !== eventUuid));
            } else {
                const result = await response.json();
                alert(`Failed to leave event: ${result.error}`);
            }
        } catch (error) {
            console.error('Error leaving the event:', error);
            alert('Failed to leave the event.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <MenuBar />
            <h2 className="text-lg font-semibold my-4 text-center">Your Participating Events</h2>
            <div className="max-w-4xl mx-auto">
                {events.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Event Name
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {events.map(event => (
                                <tr key={event.uuid}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <Link href={`/events/${event.uuid}`} className="text-indigo-600 hover:text-indigo-900">
                                            {event.name}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleLeaveEvent(event.uuid)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Leave
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-sm text-gray-500">No events found.</p>
                )}
            </div>
        </div>
    );
};

export default BoxerView;
