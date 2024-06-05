import React, { useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { UPDATE_BOXER_URL } from "../utils/apiConfig";
import {
  validateName,
  validateDate,
  validateNumber,
  validateFile,
} from "../utils/Validator";

const UpdateBoxerProfileForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    birthDate: "",
    country: "",
    gender: "",
    level: "",
    numOfFights: 0,
    weight: 0,
    stance: "",
    profilePic: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setFormData((prev) => ({
          ...prev,
          profilePic: loadEvent.target.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setErrors((prev) => ({
        ...prev,
        profilePic: "Invalid file type. Please upload a valid image.",
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!validateName(formData.fname)) newErrors.fname = "Invalid first name.";
    if (!validateName(formData.lname)) newErrors.lname = "Invalid last name.";
    if (!validateDate(formData.birthDate))
      newErrors.birthDate = "Invalid birth date.";
    if (!validateNumber(formData.numOfFights))
      newErrors.numOfFights = "Invalid number of fights.";
    if (!validateNumber(formData.weight)) newErrors.weight = "Invalid weight.";
    if (!formData.profilePic)
      newErrors.profilePic = "Profile picture is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const jwtToken = Cookies.get("jwt");
    const payload = {
      JWT: jwtToken,
      ...formData,
      email: jwtDecode(jwtToken).email,
    };

    try {
      const response = await fetch(UPDATE_BOXER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to update profile");
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
        <h1 className="text-2xl font-bold sm:text-3xl">Update Boxer Profile</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <input
          type="text"
          name="fname"
          value={formData.fname}
          onChange={handleChange}
          placeholder="First Name"
        />
        {errors.fname && <p>{errors.fname}</p>}
        <input
          type="text"
          name="lname"
          value={formData.lname}
          onChange={handleChange}
          placeholder="Last Name"
        />
        {errors.lname && <p>{errors.lname}</p>}
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
        />
        {errors.birthDate && <p>{errors.birthDate}</p>}
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          placeholder="Country"
        />
        <div>
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={handleChange}
            checked={formData.gender === "Male"}
          />{" "}
          Male
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={handleChange}
            checked={formData.gender === "Female"}
          />{" "}
          Female
        </div>
        <input
          type="text"
          name="level"
          value={formData.level}
          onChange={handleChange}
          placeholder="Level"
        />
        <input
          type="number"
          name="numOfFights"
          value={formData.numOfFights}
          onChange={handleChange}
          placeholder="Number of Fights"
        />
        {errors.numOfFights && <p>{errors.numOfFights}</p>}
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          placeholder="Weight"
        />
        {errors.weight && <p>{errors.weight}</p>}
        <select name="stance" value={formData.stance} onChange={handleChange}>
          <option value="">Select Stance</option>
          <option value="Orthodox">Orthodox</option>
          <option value="Southpaw">Southpaw</option>
        </select>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        {errors.profilePic && <p>{errors.profilePic}</p>}
        <button type="submit">Update Profile</button>
        {errors.form && <p>{errors.form}</p>}
      </form>
    </div>
  );
};

export default UpdateBoxerProfileForm;
