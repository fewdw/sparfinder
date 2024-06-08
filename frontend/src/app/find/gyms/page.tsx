'use client';
import React, { useEffect, useState } from "react";
import MenuBar from "@/app/components/MenuBar";
import { GET_ALL_GYMS_FOR_PROFILE_PAGE } from "@/app/utils/apiConfig";
import Link from "next/link";

const Page = () => {
  const [gyms, setGyms] = useState([]);
  const [filteredGyms, setFilteredGyms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchGyms = async () => {
      const response = await fetch(GET_ALL_GYMS_FOR_PROFILE_PAGE);
      const data = await response.json();
      const validGyms = data.filter(gym => gym.name && gym.address); // Filter out gyms with empty name or address
      setGyms(validGyms);
      setFilteredGyms(validGyms);
    };

    fetchGyms();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = gyms.filter(gym => 
      (gym.name && gym.name.toLowerCase().includes(value)) ||
      (gym.address && gym.address.toLowerCase().includes(value))
    );
    setFilteredGyms(filtered);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredGyms(gyms);
  };

  return (
    <div>
      <MenuBar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-6">
        <div className="relative mb-4">
          <label htmlFor="Search" className="sr-only">Search</label>
          <input
            type="text"
            id="Search"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search for gyms..."
            className="w-full rounded-md border-gray-200 py-2.5 pr-10 shadow-sm sm:text-sm"
          />
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <span className="sr-only">Clear</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4 text-gray-600 hover:text-gray-700"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGyms.map((gym) => (
            <article key={gym.UUID} className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
              <div className="p-4 sm:p-6">
                <Link href={`/find/gyms/gym/${gym.UUID}`}>
                  <h3 className="text-lg font-medium text-gray-900">{gym.name}</h3>
                </Link>
                <p className="mt-2 text-sm text-gray-500">{gym.address}</p>
                <a href={`/find/gyms/gym/${gym.UUID}`} className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                  View Gym Profile
                  <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">&rarr;</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
