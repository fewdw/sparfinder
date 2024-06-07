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
      const { account_type } = jwtDecode(jwt);
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

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const filtered = coaches.filter(coach =>
        coach.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coach.lname.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="flex flex-col sm:flex-row sm:justify-start sm:items-center sm:w-1/2 space-x-2 p-4">
        <label htmlFor="search" className="sr-only">Search Coach</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search coach"
          className="flex-1 p-2 border rounded"
        />
        <button onClick={handleSearch} className="rounded bg-blue-500 px-4 py-2 text-white">
          Search
        </button>
        <button onClick={handleReset} className="rounded bg-red-500 px-4 py-2 text-white">
          Reset
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
