import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { GET_BOXER_URL } from "../utils/apiConfig";
import UserProfilePicAndName from "./UserProfilePicAndName";
import BoxerProfileCard from "./BoxerProfileCard";

const GetBoxerProfileContent = () => {
  const [boxerProfile, setBoxerProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBoxerProfile = async () => {
      const jwtToken = Cookies.get("jwt"); // Retrieve JWT from cookies

      try {
        const response = await fetch(GET_BOXER_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ JWT: jwtToken }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch boxer profile");
        }
        setBoxerProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBoxerProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="m-0">
      {boxerProfile ? (
        <div>
          <UserProfilePicAndName
            name={`${boxerProfile.fname} ${boxerProfile.lname}`}
            imageSrc={boxerProfile.profile_pic}
            bio="Boxer"
          ></UserProfilePicAndName>
          <BoxerProfileCard boxer={boxerProfile} />
        </div>
      ) : (
        <p>No profile data found.</p>
      )}
    </div>
  );
};

export default GetBoxerProfileContent;
