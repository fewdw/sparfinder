'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { GET_GYM_BY_ID } from '@/app/utils/apiConfig';
import MenuBar from '@/app/components/MenuBar';

const Page = () => {
  const params = useParams();
  const [gym, setGym] = useState(null);

  useEffect(() => {
    async function fetchGymData() {
      const response = await fetch(`${GET_GYM_BY_ID}/${params.gym_id}`);
      const data = await response.json();
      setGym(data);
    }

    if (params.gym_id) {
      fetchGymData();
    }
  }, [params.gym_id]);

  return (
    <div>
    <div className="min-h-screen bg-gray-50">
      <MenuBar />
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-semibold text-center text-gray-800 my-6">Gym Info</h1>
        <div className="max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 shadow-md p-6">
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
      </div>
    </div>
    </div>
  );
};

export default Page;
