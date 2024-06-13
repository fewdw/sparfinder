import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { VIEW_EVENT_INVITE_LIST, REVOKE_INVITE } from "../utils/apiConfig";
import Link from "next/link";

const CoachViewEventInvitedPeopleList = ({ eventId }: { eventId: string }) => {
  const [invitedBoxers, setInvitedBoxers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInvitedBoxers();
  }, [eventId]);

  const fetchInvitedBoxers = async () => {
    const JWT = Cookies.get("jwt");
    if (!JWT) {
      setError("JWT not found. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(VIEW_EVENT_INVITE_LIST, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ JWT, event_id: eventId }),
      });
      if (!response.ok) throw new Error("Failed to fetch invited boxers.");
      const data = await response.json();
      setInvitedBoxers(data);
    } catch (error) {
      setError(`Error fetching invited boxers: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveInvite = async (boxerId: string) => {
    const JWT = Cookies.get("jwt");
    try {
      const response = await fetch(REVOKE_INVITE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ JWT, event_id: eventId, boxer_id: boxerId }),
      });
      const result = await response.json();
      if (response.ok) {
        setInvitedBoxers((prev) =>
          prev.filter((boxer: { UUID: string }) => boxer.UUID !== boxerId)
        );
      } else {
        alert(`Failed to revoke invitation: ${result.error}`);
      }
    } catch (error) {
      console.error("Error revoking invitation:", error);
      alert("Failed to revoke invitation.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Invited Boxers List</h2>
      {invitedBoxers.length > 0 ? (
        invitedBoxers.map((boxer) => (
          <div
            key={(boxer as { UUID: string }).UUID}
            className="border rounded-md p-4 my-2"
          >
            <p>Last Name: {(boxer as { lname: string }).lname}</p>
            <p>Birth Date: {(boxer as { birth_date: string }).birth_date}</p>
            <p>Country: {(boxer as { country: string }).country}</p>
            <p>Level: {(boxer as { level: string }).level}</p>
            <p>Stance: {(boxer as { stance: string }).stance}</p>
            <p>Weight: {(boxer as { weight: number }).weight} lbs</p>
            <p>Number of Fights: {(boxer as { num_of_fights: number }).num_of_fights}</p>
            <div className="flex justify-between items-center">
              <div>
                <Link
                href={`/find/boxers/boxer/${(boxer as { UUID: string }).UUID}`}
                className="text-blue-600 hover:text-blue-800"
                >
                  View Profile
                </Link>
                <span> | </span>
                <a
href={`/find/gyms/gym/${(boxer as { gym_id: string }).gym_id}`}
className="text-blue-600 hover:text-blue-800"
                >
                  View Gym
                </a>
              </div>
              <button
                onClick={() => handleRemoveInvite((boxer as { UUID: string }).UUID)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Remove Invite
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No boxers invited yet.</p>
      )}
    </div>
  );
};

export default CoachViewEventInvitedPeopleList;
