"use client";

import React, { useState } from "react";
import CoachFutureEvents from "./CoachFutureEvents";
import CoachPastEvents from "./CoachPastEvents";
import CoachCreateEvents from "./CoachCreateEvents";

const CoachMyEventsTabs = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Future Events");

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
            <option value="Future Events">Future Events</option>
            <option value="Past Events">Past Events</option>
            <option value="Create Events">Create Events</option>
          </select>
        </div>

        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-6 justify-center" aria-label="Tabs">
              <button
                onClick={() => handleTabChange("Future Events")}
                className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${
                  selectedTab === "Future Events"
                    ? "border-sky-500 text-sky-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Future Events
              </button>

              <button
                onClick={() => handleTabChange("Past Events")}
                className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${
                  selectedTab === "Past Events"
                    ? "border-sky-500 text-sky-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Past Events
              </button>

              <button
                onClick={() => handleTabChange("Create Events")}
                className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${
                  selectedTab === "Create Events"
                    ? "border-sky-500 text-sky-600"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Create Events
              </button>
            </nav>
          </div>
        </div>

        <div className="mt-4">
          {selectedTab === "Future Events" && (
            <div>
              <CoachFutureEvents></CoachFutureEvents>
            </div>
          )}
          {selectedTab === "Past Events" && (
            <div>
             <CoachPastEvents></CoachPastEvents>
            </div>
          )}
          {selectedTab === "Create Events" && (
            <div>
              <CoachCreateEvents></CoachCreateEvents>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoachMyEventsTabs;
