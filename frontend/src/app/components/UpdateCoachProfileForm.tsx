import React, { useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { CHANGE_COACH_URL } from "../utils/apiConfig";
import { validateName } from "../utils/Validator";

const UpdateCoachProfileForm = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [errors, setErrors] = useState({});

  const handleFnameChange = (e) => {
    setFname(e.target.value);
  };

  const handleLnameChange = (e) => {
    setLname(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validateName(fname)) {
      newErrors.fname = "Invalid first name.";
    }
    if (!validateName(lname)) {
      newErrors.lname = "Invalid last name.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const jwtToken = Cookies.get("jwt");
    const { email } = jwtDecode(jwtToken);

    const payload = {
      JWT: jwtToken,
      fname,
      lname,
      email,
    };

    try {
      const response = await fetch(CHANGE_COACH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      // Store the new JWT in a cookie
      Cookies.set("jwt", data.JWT, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });

      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Update error:", error);
      setErrors({ form: error.message });
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Update Profile</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <div>
          <label htmlFor="fname" className="sr-only">
            First Name
          </label>
          <input
            type="text"
            id="fname"
            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
            placeholder="First Name"
            value={fname}
            onChange={handleFnameChange}
          />
          {errors.fname && (
            <p className="text-red-500 text-xs mt-2">{errors.fname}</p>
          )}
        </div>

        <div>
          <label htmlFor="lname" className="sr-only">
            Last Name
          </label>
          <input
            type="text"
            id="lname"
            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
            placeholder="Last Name"
            value={lname}
            onChange={handleLnameChange}
          />
          {errors.lname && (
            <p className="text-red-500 text-xs mt-2">{errors.lname}</p>
          )}
        </div>

        <button
          type="submit"
          className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
        >
          Update Profile
        </button>
        {errors.form && (
          <p className="text-red-500 text-xs mt-2">{errors.form}</p>
        )}
      </form>
    </div>
  );
};

export default UpdateCoachProfileForm;
