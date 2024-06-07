import React from 'react';
import { useRouter } from 'next/navigation';

const DisplayFindCoachProfile = ({ coach }) => {
  const router = useRouter();

  const handleViewGym = (gym_id) => {
    router.push(`/find/gyms/gym/${gym_id}`);
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="flex-1 p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {coach.fname} {coach.lname}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {coach.gym_id ? (
            <a onClick={() => handleViewGym(coach.gym_id)} className="cursor-pointer text-blue-600 hover:underline">
              View {coach.fname} {coach.lname}'s Gym
            </a>
          ) : (
            "This coach has no gym."
          )}
        </p>
      </div>
    </article>
  );
};

export default DisplayFindCoachProfile;
