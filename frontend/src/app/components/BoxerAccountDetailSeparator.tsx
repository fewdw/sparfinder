"use client";

import React, { useState } from "react";
import GetBoxerProfileContent from "./GetBoxerProfileContent";
import UpdateBoxerProfileForm from "./UpdateBoxerProfileForm";
import BoxerUpdateGymForm from "./BoxerUpdateGymForm";

const BoxerAccountDetailSeparator = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Profile");

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="flex justify-center min-h-screen">
      <div className="mt-4 w-full max-w-2xl">
        <div className="sm:hidden">
          <label htmlFor="Tab" className="sr-only">
            Tab
          </label>
          <select
            id="Tab"
            className="w-full rounded-md border-gray-200"
            value={selectedTab}
            onChange={(e) => handleTabChange(e.target.value)}
          >
            <option value="Profile">Profile</option>
            <option value="Change Profile">Change Profile</option>
            <option value="Gym">Gym</option>
          </select>
        </div>

        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-6 justify-center" aria-label="Tabs">
              <button
                onClick={() => handleTabChange("Profile")}
                className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${
                  selectedTab === "Profile"
                    ? "border-sky-500 text-sky-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Profile
              </button>

              <button
                onClick={() => handleTabChange("Change Profile")}
                className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${
                  selectedTab === "Change Profile"
                    ? "border-sky-500 text-sky-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Change Profile
              </button>

              <button
                onClick={() => handleTabChange("Gym")}
                className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${
                  selectedTab === "Gym"
                    ? "border-sky-500 text-sky-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Gym
              </button>
            </nav>
          </div>
        </div>

        <div className="mt-4">
          {selectedTab === "Profile" && (
            <div>
              <GetBoxerProfileContent></GetBoxerProfileContent>
            </div>
          )}
          {selectedTab === "Change Profile" && (
            <div>
              <UpdateBoxerProfileForm></UpdateBoxerProfileForm>
            </div>
          )}
          {selectedTab === "Gym" && <div><BoxerUpdateGymForm></BoxerUpdateGymForm></div>}
        </div>
      </div>
    </div>
  );
};

export default BoxerAccountDetailSeparator;
