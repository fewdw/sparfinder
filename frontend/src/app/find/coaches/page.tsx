'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import MenuBar from "@/app/components/MenuBar";
import DisplayFindCoachProfile from "@/app/components/DisplayFindCoachProfile";
import { GET_ALL_COACHES_URL } from "@/app/utils/apiConfig";

const Page = () => {
  const router = useRouter();
  const [coaches, setCoaches] = useState([]);
  const [displayedCoaches, setDisplayedCoaches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const jwt = Cookies.get("jwt");
    if (jwt) {
      interface DecodedJwt {
        account_type: string;
      }
      const { account_type } = jwtDecode<DecodedJwt>(jwt);
            if (account_type !== "boxer" && account_type !== "coach") {
        router.push('/');
      } else {
        fetchCoaches();
      }
    } else {
      router.push('/');
    }
  }, [router]);

  const fetchCoaches = async () => {
    const response = await fetch(GET_ALL_COACHES_URL);
    const data = await response.json();
    if (response.ok) {
      const filteredCoaches = data.filter(coach => coach.fname && coach.lname); // Exclude empty names
      setCoaches(filteredCoaches);
      setDisplayedCoaches(filteredCoaches);
    } else {
      console.error('Failed to fetch coaches');
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      const filtered = coaches.filter(coach =>
        `${coach.fname} ${coach.lname}`.toLowerCase().includes(value.toLowerCase())
      );
      setDisplayedCoaches(filtered);
    } else {
      setDisplayedCoaches(coaches);
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    setDisplayedCoaches(coaches);
  };

  return (
    <div>
      <MenuBar />
      <div className="relative m-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for coaches..."
          className="w-full rounded-md border-gray-200 py-2.5 pr-10 shadow-sm sm:text-sm"
        />
        <button
          onClick={handleReset}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <span className="sr-only">Clear</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4 text-gray-600 hover:text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {displayedCoaches.map((coach) => (
          <DisplayFindCoachProfile key={coach.gym_id || coach.fname} coach={coach} />
        ))}
      </div>
    </div>
  );
};

export default Page;
