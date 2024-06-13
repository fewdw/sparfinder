'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { GET_GYM_BY_ID, getBoxersFromGymById, getCoachesFromGymById } from '@/app/utils/apiConfig';
import MenuBar from '@/app/components/MenuBar';

const Page = () => {
  const params = useParams();
  const [gym, setGym] = useState(null);
  const [boxers, setBoxers] = useState([]);
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (params.gym_id) {
        const gymResponse = await fetch(`${GET_GYM_BY_ID}/${params.gym_id}`);
        const gymData = await gymResponse.json();
        setGym(gymData);

        const boxersUrl = getBoxersFromGymById(Array.isArray(params.gym_id) ? params.gym_id[0] : params.gym_id);
        const boxersResponse = await fetch(boxersUrl);
        const boxersData = await boxersResponse.json();
        setBoxers(boxersData);

        const coachesUrl = getCoachesFromGymById(Array.isArray(params.gym_id) ? params.gym_id[0] : params.gym_id);
        const coachesResponse = await fetch(coachesUrl);
        const coachesData = await coachesResponse.json();
        setCoaches(coachesData);
      }
    }
    fetchData();
  }, [params.gym_id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <MenuBar />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold text-center text-gray-800 my-6">Gym Info</h1>
        <div className="max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 shadow-md p-6 mb-6">
          <dl className="divide-y divide-gray-100 text-sm">
            {gym ? (
              <>
                <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <dt className="font-medium text-gray-900">Name</dt>
                  <dd className="text-gray-700 sm:col-span-2">{gym.name}</dd>
                </div>
                <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <dt className="font-medium text-gray-900">Address</dt>
                  <dd className="text-gray-700 sm:col-span-2">{gym.address}</dd>
                </div>
                <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <dt className="font-medium text-gray-900">Level</dt>
                  <dd className="text-gray-700 sm:col-span-2">{gym.level}</dd>
                </div>
                <div className="py-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <dt className="font-medium text-gray-900">Gym Rules</dt>
                  <dd className="text-gray-700 sm:col-span-2">{gym.rules}</dd>
                </div>
              </>
            ) : (
              <p>Loading gym information...</p>
            )}
          </dl>
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-800">Boxers</h2>
        <div className="max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 shadow-md p-6">
          {boxers.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Full Name</th>
                  <th scope="col" className="px-6 py-3">Birth Date</th>
                  <th scope="col" className="px-6 py-3">Country</th>
                  <th scope="col" className="px-6 py-3">Gender</th>
                  <th scope="col" className="px-6 py-3">Level</th>
                  <th scope="col" className="px-6 py-3">Fights</th>
                  <th scope="col" className="px-6 py-3">Stance</th>
                  <th scope="col" className="px-6 py-3">Weight (lbs)</th>
                </tr>
              </thead>
              <tbody>
                {boxers.map((boxer) => (
                  boxer.fname && <tr key={boxer.UUID} className="bg-white border-b">
                    <td className="px-6 py-4">{boxer.fname} {boxer.lname}</td>
                    <td className="px-6 py-4">{boxer.birth_date}</td>
                    <td className="px-6 py-4">{boxer.country}</td>
                    <td className="px-6 py-4">{boxer.gender}</td>
                    <td className="px-6 py-4">{boxer.level}</td>
                    <td className="px-6 py-4">{boxer.num_of_fights}</td>
                    <td className="px-6 py-4">{boxer.stance}</td>
                    <td className="px-6 py-4">{boxer.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center my-6">Loading boxers...</p>
          )}
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mt-6">Coaches</h2>
        <div className="max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 shadow-md p-6 flex flex-wrap justify-between">
          {coaches.map((coach, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm m-2 flex-auto min-w-[240px]">
              <h3 className="text-lg font-medium text-gray-900">{coach.fname} {coach.lname}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
