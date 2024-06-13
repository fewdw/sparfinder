import React from "react";

const BoxerProfileCard = ({ boxer }: { boxer: any }) => {
  return (
    <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm mt-10">
      <dl className="-my-3 divide-y divide-gray-100 text-sm">
        <div className="p-3">
          <dt className="font-medium text-gray-900">Gender</dt>
          <dd className="text-gray-700">{boxer.gender}</dd>
        </div>
        <div className="p-3">
          <dt className="font-medium text-gray-900">Country</dt>
          <dd className="text-gray-700">{boxer.country}</dd>
        </div>
        <div className="p-3">
          <dt className="font-medium text-gray-900">Birth Date</dt>
          <dd className="text-gray-700">{boxer.birth_date}</dd>
        </div>
        <div className="p-3">
          <dt className="font-medium text-gray-900">Level</dt>
          <dd className="text-gray-700">{boxer.level}</dd>
        </div>
        <div className="p-3">
          <dt className="font-medium text-gray-900">Number of Fights</dt>
          <dd className="text-gray-700">{boxer.num_of_fights}</dd>
        </div>
        <div className="p-3">
          <dt className="font-medium text-gray-900">Weight</dt>
          <dd className="text-gray-700">{boxer.weight}</dd>
        </div>
        <div className="p-3">
          <dt className="font-medium text-gray-900">Stance</dt>
          <dd className="text-gray-700">{boxer.stance}</dd>
        </div>
      </dl>
    </div>
  );
};

export default BoxerProfileCard;
