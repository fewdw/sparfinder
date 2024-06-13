"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import MenuBar from "@/app/components/MenuBar";
import { GET_ALL_BOXERS_URL } from "@/app/utils/apiConfig";
import Link from "next/link";

const DisplayBoxerProfile = ({ boxer }) => {
  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-lg font-semibold">
        {boxer.fname} {boxer.lname}
      </h3>
      <p>
        {boxer.country}, {boxer.birth_date}
      </p>
      <p>
        {boxer.weight} lbs, {boxer.num_of_fights} fights
      </p>
      <Link
        href={`/find/boxers/boxer/${boxer.UUID}`}
        className="mt-2 inline-block text-blue-600 hover:text-blue-800"
      >
        View Profile
      </Link>
    </div>
  );
};

const BoxersPage = () => {
  const router = useRouter();
  const [boxers, setBoxers] = useState([]);
  const [displayedBoxers, setDisplayedBoxers] = useState([]);
  const [filters, setFilters] = useState({
    country: "",
    gender: "",
    level: "",
    stance: "",
    minWeight: 0,
    maxWeight: 200,
    minFights: 0,
    maxFights: 200,
  });

  useEffect(() => {
    const jwt = Cookies.get("jwt");
    if (jwt) {
      interface DecodedJwt {
        account_type: string;
      }

      const { account_type } = jwtDecode<DecodedJwt>(jwt);
      if (account_type !== "boxer" && account_type !== "coach") {
        router.push("/");
      } else {
        fetchBoxers();
      }
    } else {
      router.push("/");
    }
  }, [router, filters]);

  const fetchBoxers = async () => {
    const apiFilters = {
      ...filters,
      maxWeight: filters.maxWeight === 200 ? 1000 : filters.maxWeight,
      maxFights: filters.maxFights === 200 ? 1000 : filters.maxFights,
    };

    const query = Object.entries(apiFilters)
      .filter(([, value]) => value !== "")
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    const url = `${GET_ALL_BOXERS_URL}?${query}`;
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      const filteredBoxers = data.filter((boxer) => boxer.fname && boxer.lname); // Exclude profiles with empty names
      setBoxers(filteredBoxers);
      setDisplayedBoxers(filteredBoxers);
    } else {
      console.error("Failed to fetch boxers");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: isNaN(value) ? value : Number(value),
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      country: "",
      gender: "",
      level: "",
      stance: "",
      minWeight: 0,
      maxWeight: 200,
      minFights: 0,
      maxFights: 200,
    });
  };

  const displayValue = (value) => {
    return value >= 200 ? "200+" : value;
  };

  return (
    <div>
      <MenuBar />
      <div className="p-4">
        <div className="my-4 p-4 bg-white shadow rounded-lg">
          <h4 className="text-lg font-bold mb-2">Filter Boxers</h4>
          <div className="grid grid-cols-2 gap-4">
            <select
              name="country"
              value={filters.country}
              onChange={handleFilterChange}
              className="border p-2 rounded"
            >
              <option value="">Select Country</option>
              <option value="Canada">Canada</option>
              <option value="US">United States</option>
              <option value="Mexico">Mexico</option>
              <option value="UK">United Kingdom</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
              <option value="Italy">Italy</option>
              <option value="Spain">Spain</option>
            </select>
            <select
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
              className="border p-2 rounded"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <select
              name="level"
              value={filters.level}
              onChange={handleFilterChange}
              className="border p-2 rounded"
            >
              <option value="">Select Level</option>
              <option value="Recreational">Recreational</option>
              <option value="Amateur">Amateur</option>
              <option value="Pro">Pro</option>
            </select>
            <select
              name="stance"
              value={filters.stance}
              onChange={handleFilterChange}
              className="border p-2 rounded"
            >
              <option value="">Select Stance</option>
              <option value="Orthodox">Orthodox</option>
              <option value="Southpaw">Southpaw</option>
            </select>
            <div>
              <label htmlFor="minWeight">
                Min Weight (lbs): {displayValue(filters.minWeight)}
              </label>
              <input
                type="range"
                name="minWeight"
                min="0"
                max="200"
                step="5"
                value={filters.minWeight}
                onChange={handleFilterChange}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="maxWeight">
                Max Weight (lbs): {displayValue(filters.maxWeight)}
              </label>
              <input
                type="range"
                name="maxWeight"
                min="0"
                max="200"
                step="5"
                value={filters.maxWeight}
                onChange={handleFilterChange}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="minFights">
                Min Fights: {displayValue(filters.minFights)}
              </label>
              <input
                type="range"
                name="minFights"
                min="0"
                max="200"
                step="5"
                value={filters.minFights}
                onChange={handleFilterChange}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="maxFights">
                Max Fights: {displayValue(filters.maxFights)}
              </label>
              <input
                type="range"
                name="maxFights"
                min="0"
                max="200"
                step="5"
                value={filters.maxFights}
                onChange={handleFilterChange}
                className="w-full"
              />
            </div>
          </div>
          <button
            onClick={handleResetFilters}
            className="mt-4 bg-red-500 text-white p-2 rounded"
          >
            Reset Filters
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedBoxers.map((boxer) => (
            <DisplayBoxerProfile key={boxer.UUID} boxer={boxer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoxersPage;
