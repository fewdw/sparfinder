import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { GET_COACH_URL } from "../utils/apiConfig";
import UserProfilePicAndName from "./UserProfilePicAndName";

const GetCoachProfileContent = () => {
  const [coachProfile, setCoachProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCoachProfile = async () => {
      const jwtToken = Cookies.get("jwt"); // Retrieve JWT from cookies

      try {
        const response = await fetch(GET_COACH_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ JWT: jwtToken }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch coach profile");
        }
        setCoachProfile(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoachProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="m-0">
      {coachProfile ? (
        <UserProfilePicAndName
        name={`${(coachProfile as { fname: string; lname: string }).fname} ${(coachProfile as { fname: string; lname: string }).lname}`}
        bio={`Coach`}
        imageSrc={(coachProfile as { profile_pic: string }).profile_pic}
        ></UserProfilePicAndName>
      ) : (
        <p>No profile data found.</p>
      )}
    </div>
  );
};

export default GetCoachProfileContent;
