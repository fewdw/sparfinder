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
                <table>
                    <thead>
                        <tr>
                            <th>UUID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Birth Date</th>
                            <th>Country</th>
                            <th>Gender</th>
                            <th>Gym ID</th>
                            <th>Level</th>
                            <th>Number of Fights</th>
                            <th>Stance</th>
                            <th>Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{boxer.UUID}</td>
                            <td>{boxer.fname}</td>
                            <td>{boxer.lname}</td>
                            <td>{boxer.birth_date}</td>
                            <td>{boxer.country}</td>
                            <td>{boxer.gender}</td>
                            <td>{boxer.gym_id}</td>
                            <td>{boxer.level}</td>
                            <td>{boxer.num_of_fights}</td>
                            <td>{boxer.stance}</td>
                            <td>{boxer.weight}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default BoxerPage;
