"use client";

import React, { useState } from "react";

const CoachAccountDetailSeparator = () => {
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
            <option value="Change profile">Change profile</option>
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
                onClick={() => handleTabChange("Change profile")}
                className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${
                  selectedTab === "Change profile"
                    ? "border-sky-500 text-sky-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Change profile
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
          {selectedTab === "Profile" && <div>Profile content</div>}
          {selectedTab === "Change profile" && (
            <div>Change profile content</div>
          )}
          {selectedTab === "Gym" && <div>Gym content</div>}
        </div>
      </div>
    </div>
  );
};

export default CoachAccountDetailSeparator;
