import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import MenuBar from "./MenuBar";
import {
  VIEW_BOXER_INVITED_EVENTS,
  ACCEPT_INVITATION,
  LEAVE_INVITED_EVENT,
} from "../utils/apiConfig";
import Link from "next/link";

const BoxerInviteList = () => {
  const [invitedEvents, setInvitedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInvitedEvents();
  }, []);

  const fetchInvitedEvents = async () => {
    const JWT = Cookies.get("jwt");
    if (!JWT) {
      setError("JWT not found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(VIEW_BOXER_INVITED_EVENTS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ JWT }),
      });
      if (!response.ok) throw new Error("Failed to fetch invited events.");
      const data = await response.json();
      setInvitedEvents(data);
    } catch (error) {
      setError(`Error fetching invited events: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveEvent = async (eventUuid: string) => {
    const JWT = Cookies.get("jwt");
    try {
      const response = await fetch(LEAVE_INVITED_EVENT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ JWT, event_id: eventUuid }),
      });
      if (response.ok) {
        setInvitedEvents((prev) =>
          prev.filter((event: { uuid: string }) => event.uuid !== eventUuid)
        );
      } else {
        alert("Failed to leave event.");
      }
    } catch (error) {
      console.error("Error leaving the event:", error);
      alert("Failed to leave the event.");
    }
  };

  const handleAcceptEvent = async (eventUuid: string) => {
    const JWT = Cookies.get("jwt");
    try {
      const response = await fetch(ACCEPT_INVITATION, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ JWT, event_id: eventUuid }),
      });
      const result = await response.json();
      if (result.success) {
        setInvitedEvents((prev) =>
          prev.filter((event: { uuid: string }) => event.uuid !== eventUuid)
        );
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error accepting the invitation:", error);
      alert("Failed to accept the invitation.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <MenuBar />
      <h2 className="text-lg font-semibold my-4 text-center">
        Your Invited Events
      </h2>
      <div className="max-w-4xl mx-auto">
        {invitedEvents.length > 0 ? (
          invitedEvents.map((event) => (
            <div
              key={(event as { uuid: string }).uuid}
              className="border rounded-md p-4 my-2 flex justify-between items-center"
            >
              <Link
                href={`/events/${(event as { uuid: string }).uuid}`}
                className="text-indigo-600 hover:text-indigo-900"
              >
                {(event as { name: string }).name}
              </Link>
              <div>
                <button
onClick={() => handleAcceptEvent((event as { uuid: string }).uuid)}
className="mr-2 px-4 py-2 text-sm font-medium text-green-600 hover:text-green-800 border border-green-600 hover:border-green-800 rounded"
                >
                  Accept
                </button>
                <button
onClick={() => handleLeaveEvent((event as { uuid: string }).uuid)}
className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 border border-red-600 hover:border-red-800 rounded"
                >
                  Leave
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-sm text-gray-500">No events found.</p>
        )}
      </div>
    </div>
  );
};

export default BoxerInviteList;
