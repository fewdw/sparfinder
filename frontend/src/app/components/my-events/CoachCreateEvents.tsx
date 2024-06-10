import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { POST_NEW_EVENT } from '../../utils/apiConfig';
import {
  validateName,
  validateDescription,
  validateDate,
  validateTime,
  validateDuration,
  validateLocation,
  validateMaxParticipants
} from '../../utils/EventValidator';
import { useRouter } from "next/navigation"; // Correct hook for App Router

const CoachCreateEvents = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    length_time: '',
    location: '',
    max_participants: '',
    is_private: false,
    use_gym_location: true
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track if the form has been submitted

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validateName(formData.name)) newErrors.name = 'Event name must be 1-100 characters long.';
    if (!validateDescription(formData.description)) newErrors.description = 'Description must be 5-500 characters long.';
    if (!validateDate(formData.date)) newErrors.date = 'Please select a future date.';
    if (!validateTime(formData.time)) newErrors.time = 'Time must be in HH:MM format.';
    if (!validateDuration(Number(formData.length_time))) newErrors.length_time = 'Duration must be between 1 and 5 hours.';
    if (!formData.use_gym_location && !validateLocation(formData.location)) newErrors.location = 'Location must be 5-500 characters long.';
    if (!validateMaxParticipants(Number(formData.max_participants))) newErrors.max_participants = 'Participants must be between 2 and 100.';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const jwtToken = Cookies.get('jwt');
    const payload = {
      ...formData,
      JWT: jwtToken,
      location: formData.use_gym_location ? "" : formData.location
    };

    try {
      const response = await fetch(POST_NEW_EVENT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok) {
        setIsSubmitted(true); // Set the submission status to true
      } else {
        throw new Error(data.message || 'Failed to create event');
      }
    } catch (error) {
      console.error('Create event error:', error);
      setErrors({ submit: error.message });
    }
  };

  if (isSubmitted) {
    return <p className="text-lg text-green-600 p-4">Event submitted successfully. Please go to the Future Events tab to see it.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-3">Create a New Event</h2>
      <form onSubmit={handleSubmit}>
  <div className="mb-4">
    <label htmlFor="name" className="block font-medium text-gray-700">Event Name</label>
    <input
      type="text"
      id="name"
      name="name"
      value={formData.name}
      onChange={handleChange}
      required
      className="w-full p-2 border rounded"
    />
    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
  </div>
  <div className="mb-4">
    <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
    <textarea
      id="description"
      name="description"
      value={formData.description}
      onChange={handleChange}
      required
      className="w-full p-2 border rounded"
      rows="4"
    />
    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
  </div>
  <div className="mb-4">
    <label htmlFor="date" className="block font-medium text-gray-700">Date</label>
    <input
      type="date"
      id="date"
      name="date"
      value={formData.date}
      onChange={handleChange}
      required
      className="w-full p-2 border rounded"
    />
    {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
  </div>
  <div className="mb-4">
    <label htmlFor="time" className="block font-medium text-gray-700">Time</label>
    <input
      type="time"
      id="time"
      name="time"
      value={formData.time}
      onChange={handleChange}
      required
      className="w-full p-2 border rounded"
    />
    {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
  </div>
  <div className="mb-4">
    <label htmlFor="length_time" className="block font-medium text-gray-700">Event Duration (hours)</label>
    <input
      type="number"
      id="length_time"
      name="length_time"
      value={formData.length_time}
      onChange={handleChange}
      required
      min="1"
      max="8"
      className="w-full p-2 border rounded"
    />
    {errors.length_time && <p className="text-red-500 text-xs mt-1">{errors.length_time}</p>}
  </div>
  <div className="mb-4 flex items-center space-x-4">
    <div className="flex-grow">
      <label htmlFor="location" className="block font-medium text-gray-700">Location</label>
      <input
        type="text"
        id="location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required={!formData.use_gym_location}
        disabled={formData.use_gym_location}
        className="w-full p-2 border rounded"
      />
      {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
    </div>
    <div>
      <label htmlFor="use_gym_location" className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          id="use_gym_location"
          name="use_gym_location"
          checked={formData.use_gym_location}
          onChange={handleChange}
          className="mt-1"
        />
        <span className="text-gray-700">Use My Gym's Location</span>
      </label>
    </div>
  </div>
  <div className="mb-4">
    <label htmlFor="max_participants" className="block font-medium text-gray-700">Max Participants</label>
    <input
      type="number"
      id="max_participants"
      name="max_participants"
      value={formData.max_participants}
      onChange={handleChange}
      required
      min="1"
      max="100"
      className="w-full p-2 border rounded"
    />
    {errors.max_participants && <p className="text-red-500 text-xs mt-1">{errors.max_participants}</p>}
  </div>
  <div className="mb-4">
    <label htmlFor="is_private" className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        id="is_private"
        name="is_private"
        checked={formData.is_private}
        onChange={handleChange}
        className="mt-1"
      />
      <span className="text-gray-700">Private Event</span>
    </label>
  </div>
  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Create Event</button>
</form>

    </div>
  );
};

export default CoachCreateEvents;
