import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import MenuBar from "./MenuBar";
import {
  BOXER_WAITING_LIST_VIEW_EVENTS,
  BOXER_LEAVE_WAITING_LIST_EVENT,
} from "../utils/apiConfig";
import Link from "next/link";

const BoxerWaitingListView = () => {
  const [waitingEvents, setWaitingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWaitingEvents();
  }, []);

  const fetchWaitingEvents = async () => {
    const JWT = Cookies.get("jwt");
    if (!JWT) {
      setError("JWT not found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(BOXER_WAITING_LIST_VIEW_EVENTS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ JWT }),
      });
      if (!response.ok) throw new Error("Failed to fetch waiting events.");
      const data = await response.json();
      setWaitingEvents(data);
    } catch (error) {
      setError(`Error fetching waiting events: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveWaitingEvent = async (eventUuid: string) => {
    const JWT = Cookies.get("jwt");
    try {
      const response = await fetch(BOXER_LEAVE_WAITING_LIST_EVENT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ JWT, event_id: eventUuid }),
      });
      if (response.ok) {
        setWaitingEvents((prevEvents) =>
          prevEvents.filter(
            (event: { uuid: string }) => event.uuid !== eventUuid
          )
        );
      } else {
        const result = await response.json();
        alert(`Failed to leave waiting list: ${result.error}`);
      }
    } catch (error) {
      console.error("Error leaving waiting list:", error);
      alert("Failed to leave waiting list.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <MenuBar />
      <h2 className="text-lg font-semibold my-4 text-center">
        Your Waiting List Events
      </h2>
      <div className="max-w-4xl mx-auto">
        {waitingEvents.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {waitingEvents.map((event) => (
                <tr key={(event as { uuid: string }).uuid}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link
                      href={`/events/${(event as { uuid: string }).uuid}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      {(event as { name: string }).name}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() =>
                        handleLeaveWaitingEvent(
                          (event as { uuid: string }).uuid
                        )
                      }
                      className="text-red-600 hover:text-red-900"
                    >
                      Leave
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-sm text-gray-500">
            No events found on the waiting list.
          </p>
        )}
      </div>
    </div>
  );
};

export default BoxerWaitingListView;
