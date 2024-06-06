import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { UPDATE_OR_DELETE_COACH_GYM } from '../utils/apiConfig';
import { validateGymName, validateGymAddress } from '../utils/Validator';

const CreateGymForm = () => {
  const [gymName, setGymName] = useState('');
  const [gymAddress, setGymAddress] = useState('');
  const [gymRules, setGymRules] = useState('');
  const [gymLevel, setGymLevel] = useState(''); // Initially no level selected
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!validateGymName(gymName)) {
      newErrors.gymName = 'Gym name must be between 5 and 50 characters and only include letters, numbers, and spaces.';
    }
    if (!validateGymAddress(gymAddress)) {
      newErrors.gymAddress = 'Gym address must be between 10 and 500 characters and only include letters, numbers, and spaces.';
    }
    if (!validateGymAddress(gymRules)) { // Reusing validateGymAddress for rules based on your instructions
      newErrors.gymRules = 'Rules must only include letters, numbers, and spaces and be between 10 and 500 characters.';
    }
    if (!gymLevel) {
      newErrors.gymLevel = 'Please select a gym level.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const jwtToken = Cookies.get('jwt');
    const payload = {
      JWT: jwtToken,
      name: gymName,
      address: gymAddress,
      rules: gymRules,
      level: gymLevel,
    };

    try {
      const response = await fetch(UPDATE_OR_DELETE_COACH_GYM, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create gym');
      }

      alert('Gym created successfully.');
    } catch (error) {
      console.error('Create gym error:', error);
      setErrors({ form: error.message });
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Create Your Gym</h1>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
        {/* Gym Name */}
        <div>
          <label htmlFor="gymName" className="sr-only">Gym Name</label>
          <input
            type="text"
            id="gymName"
            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
            placeholder="Gym Name"
            value={gymName}
            onChange={(e) => setGymName(e.target.value)}
          />
          {errors.gymName && <p className="text-red-500 text-xs mt-2">{errors.gymName}</p>}
        </div>

        {/* Address */}
        <div>
          <label htmlFor="gymAddress" className="sr-only">Address</label>
          <input
            type="text"
            id="gymAddress"
            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
            placeholder="Address"
            value={gymAddress}
            onChange={(e) => setGymAddress(e.target.value)}
          />
          {errors.gymAddress && <p className="text-red-500 text-xs mt-2">{errors.gymAddress}</p>}
        </div>

        {/* Gym Rules */}
        <div>
          <label htmlFor="gymRules" className="block text-sm font-medium text-gray-700"> Gym Rules </label>
          <textarea
            id="gymRules"
            className="mt-2 w-full rounded-lg border-gray-200 shadow-sm sm:text-sm"
            rows="4"
            placeholder="Enter gym rules..."
            value={gymRules}
            onChange={(e) => setGymRules(e.target.value)}
          ></textarea>
          {errors.gymRules && <p className="text-red-500 text-xs mt-2">{errors.gymRules}</p>}
        </div>

        {/* Gym Level */}
        <fieldset className="space-y-4">
          <legend className="sr-only">Gym Level</legend>
          {errors.gymLevel && <p className="text-red-500 text-xs mt-2">{errors.gymLevel}</p>}
          <div>
            <label
              htmlFor="Recreational"
              className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
            >
              <div>
                <p className="text-gray-700">Recreational</p>
                <p className="mt-1 text-gray-900">Just for fun!</p>
              </div>
              <input
                type="radio"
                name="gymLevel"
                value="Recreational"
                id="Recreational"
                className="size-5 border-gray-300 text-blue-500"
                checked={gymLevel === 'Recreational'}
                onChange={() => setGymLevel('Recreational')}
              />
            </label>
          </div>

          <div>
            <label
              htmlFor="Amateur"
              className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
            >
              <div>
                <p className="text-gray-700">Amateur</p>
                <p className="mt-1 text-gray-900">Challenge yourself!</p>
              </div>
              <input
                type="radio"
                name="gymLevel"
                value="Amateur"
                id="Amateur"
                className="size-5 border-gray-300 text-blue-500"
                checked={gymLevel === 'Amateur'}
                onChange={() => setGymLevel('Amateur')}
              />
            </label>
          </div>

          <div>
            <label
              htmlFor="Pro"
              className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
            >
              <div>
                <p className="text-gray-700">Pro</p>
                <p className="mt-1 text-gray-900">Aim for the stars!</p>
              </div>
              <input
                type="radio"
                name="gymLevel"
                value="Pro"
                id="Pro"
                className="size-5 border-gray-300 text-blue-500"
                checked={gymLevel === 'Pro'}
                onChange={() => setGymLevel('Pro')}
              />
            </label>
          </div>
        </fieldset>

        {/* Submit Button */}
        <button
          type="submit"
          className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        >
          Create Gym
        </button>
        {errors.form && <p className="text-red-500 text-xs mt-2">{errors.form}</p>}
      </form>
    </div>
  );
};

export default CreateGymForm;
