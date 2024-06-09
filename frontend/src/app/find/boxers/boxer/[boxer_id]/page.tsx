'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import MenuBar from '@/app/components/MenuBar';
import { GET_BOXER_BY_ID } from "@/app/utils/apiConfig";

const BoxerPage = () => {
    const params = useParams();
    const [boxer, setBoxer] = useState(null);

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

        fetchBoxer();
    }, [params.boxer_id]);

    return (
        <div>
            <MenuBar />
            {boxer ? (
                <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm m-8">
                    <dl className="-my-3 divide-y divide-gray-100 text-sm">
                        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">First Name</dt>
                            <dd className="text-gray-700 sm:col-span-2">{boxer.fname}</dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Last Name</dt>
                            <dd className="text-gray-700 sm:col-span-2">{boxer.lname}</dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Birth Date</dt>
                            <dd className="text-gray-700 sm:col-span-2">{boxer.birth_date}</dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Country</dt>
                            <dd className="text-gray-700 sm:col-span-2">{boxer.country}</dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Gender</dt>
                            <dd className="text-gray-700 sm:col-span-2">{boxer.gender}</dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Gym ID</dt>
                            <dd className="text-gray-700 sm:col-span-2">{boxer.gym_id}</dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Level</dt>
                            <dd className="text-gray-700 sm:col-span-2">{boxer.level}</dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Number of Fights</dt>
                            <dd className="text-gray-700 sm:col-span-2">{boxer.num_of_fights}</dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Stance</dt>
                            <dd className="text-gray-700 sm:col-span-2">{boxer.stance}</dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-medium text-gray-900">Weight</dt>
                            <dd className="text-gray-700 sm:col-span-2">{boxer.weight}</dd>
                        </div>
                    </dl>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default BoxerPage;
