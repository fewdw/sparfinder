import React, { useState } from 'react';
import Cookies from 'js-cookie';

const CoachCreateEvents = () => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    length_time: 1,
    location: '',
    gym_id: '',
    max_participants: 20,
    is_private: false,
    use_gym_location: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData({
      ...eventData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jwt = Cookies.get('jwt');
    const payload = {
      JWT: jwt,
      ...eventData
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/sparfinder/api/event/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create event');
      }

      alert('Event created successfully!');
    } catch (error) {
      console.error('Event creation error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Create Sparring Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Event Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block mb-2">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label htmlFor="time" className="block mb-2">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={eventData.time}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="length_time" className="block mb-2">Duration (Hours)</label>
          <input
            type="number"
            id="length_time"
            name="length_time"
            min="1"
            max="8"
            value={eventData.length_time}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="location" className="block mb-2">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              disabled={eventData.use_gym_location}
              required={!eventData.use_gym_location}
            />
          </div>
          <div>
            <label htmlFor="gym_id" className="block mb-2">Gym ID</label>
            <input
              type="text"
              id="gym_id"
              name="gym_id"
              value={eventData.gym_id}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="max_participants" className="block mb-2">Maximum Participants</label>
          <input
            type="number"
            id="max_participants"
            name="max_participants"
            min="1"
            value={eventData.max_participants}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="is_private" className="block mb-2">Private Event</label>
          <input
            type="checkbox"
            id="is_private"
            name="is_private"
            checked={eventData.is_private}
            onChange={handleChange}
            className="align-middle"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="use_gym_location" className="block mb-2">Use Gym Location</label>
          <input
            type="checkbox"
            id="use_gym_location"
            name="use_gym_location"
            checked={eventData.use_gym_location}
            onChange={handleChange}
            className="align-middle"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded shadow">
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CoachCreateEvents;
