import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { GET_ALL_EVENTS_EVENTS_PAGE_FUTURE, GET_ALL_EVENTS_EVENTS_PAGE_PAST } from '../../utils/apiConfig';

const ViewAllEvents = () => {
  const [activeTab, setActiveTab] = useState('future');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    minDate: '',
    maxDate: '',
    minTime: '',
    maxTime: '',
    isPrivate: true,  // Default to true
    isPublic: true,   // Default to true
    hasPlace: false
  });

  const fetchEvents = async () => {
    let url = activeTab === 'future' ? GET_ALL_EVENTS_EVENTS_PAGE_FUTURE : GET_ALL_EVENTS_EVENTS_PAGE_PAST;
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value) queryParams.append(key, value.toString());
    }
    url += `?${queryParams.toString()}`;
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
  }, [activeTab, filters]);

  const handleFilterChange = (field: string, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const resetFilters = () => {
    setFilters({
      minDate: '',
      maxDate: '',
      minTime: '',
      maxTime: '',
      isPrivate: true,
      isPublic: true,
      hasPlace: false
    });
  };

  return (
    <div className='mt-4'>
      <div className="border-b border-gray-200 pb-4">
        <div className="sm:hidden">
          <select id="eventTab" className="w-full rounded-md border-gray-200 p-2" value={activeTab} onChange={(e) => setActiveTab(e.target.value)}>
            <option value="future">Future Events</option>
            <option value="past">Past Events</option>
          </select>
        </div>

        <div className="hidden sm:block">
          <nav className="flex justify-center gap-6">
            <button onClick={() => setActiveTab('future')} className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${activeTab === 'future' ? 'border-sky-500 text-sky-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>Future Events</button>
            <button onClick={() => setActiveTab('past')} className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${activeTab === 'past' ? 'border-sky-500 text-sky-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}>Past Events</button>
          </nav>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 p-4">
        <label className="block mb-2">
        Minimum Date:
        <input type="date" value={filters.minDate} onChange={(e) => handleFilterChange('minDate', e.target.value)} className="p-2 rounded-md border-gray-200" />
    </label>
    <label className="block mb-2">
        Maximum Date:
        <input type="date" value={filters.maxDate} onChange={(e) => handleFilterChange('maxDate', e.target.value)} className="p-2 rounded-md border-gray-200" />
    </label>
    <label className="block mb-2">
        Minimum Time:
        <input type="time" value={filters.minTime} onChange={(e) => handleFilterChange('minTime', e.target.value)} className="p-2 rounded-md border-gray-200" />
    </label>
    <label className="block mb-2">
        Maximum Time:
        <input type="time" value={filters.maxTime} onChange={(e) => handleFilterChange('maxTime', e.target.value)} className="p-2 rounded-md border-gray-200" />
    </label>
    <label className="flex items-center gap-2 mb-2">
        <input type="checkbox" checked={filters.isPrivate} onChange={(e) => handleFilterChange('isPrivate', e.target.checked)} />
        Private Event
    </label>
    <label className="flex items-center gap-2 mb-2">
        <input type="checkbox" checked={filters.hasPlace} onChange={(e) => handleFilterChange('hasPlace', e.target.checked)} />
        Has Place
    </label>
    <button onClick={resetFilters} className="bg-gray-300 p-2 rounded-md">Clear Filters</button>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
{events.map((event: { uuid: string }) => <EventCard key={event.uuid} event={event} />)}
</div>
      )}
    </div>
  );
};

export default ViewAllEvents;
