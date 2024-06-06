import React, { useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { UPDATE_BOXER_URL } from "../utils/apiConfig";
import {
  validateName,
  validateDate,
  validateNumber,
  validateSelect,
  validateNumOfFights,
  validateWeight,
} from "../utils/Validator";

const UpdateBoxerProfileForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    birthDate: "",
    country: "",
    gender: "",
    level: "",
    numOfFights: "",
    weight: "",
    stance: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!validateName(formData.fname)) newErrors.fname = "Invalid first name.";
    if (!validateName(formData.lname)) newErrors.lname = "Invalid last name.";
    if (!validateDate(formData.birthDate))
      newErrors.birthDate = "Invalid birth date.";
    if (!validateNumOfFights(formData.numOfFights))
      newErrors.numOfFights = "Invalid number of fights.";
    if (!validateWeight(formData.weight)) newErrors.weight = "Invalid weight.";
    if (
      !validateSelect(formData.country, [
        "Canada",
        "US",
        "Mexico",
        "UK",
        "France",
        "Germany",
        "Italy",
        "Spain",
      ])
    )
      newErrors.country = "Invalid country.";
    if (!validateSelect(formData.gender, ["Male", "Female"]))
      newErrors.gender = "Invalid gender.";
    if (!validateSelect(formData.level, ["Recreational", "Amateur", "Pro"]))
      newErrors.level = "Invalid level.";
    if (!validateSelect(formData.stance, ["Orthodox", "Southpaw"]))
      newErrors.stance = "Invalid stance.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const jwtToken = Cookies.get("jwt");
    const { email } = jwtDecode(jwtToken);

    const payload = {
      JWT: jwtToken,
      birth_date: formData.birthDate,
      country: formData.country,
      fname: formData.fname,
      gender: formData.gender,
      level: formData.level,
      lname: formData.lname,
      num_of_fights: parseInt(formData.numOfFights),
      profile_pic: "", // Assuming placeholder, adjust as necessary
      stance: formData.stance,
      weight: parseInt(formData.weight),
      email,
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
        <div className="space-y-2">
          <label htmlFor="fname" className="block font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="fname"
            id="fname"
            value={formData.fname}
            onChange={handleChange}
            placeholder="Enter your first name"
            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
          />
          {errors.fname && (
            <p className="text-red-500 text-xs mt-2">{errors.fname}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="lname" className="block font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="lname"
            id="lname"
            value={formData.lname}
            onChange={handleChange}
            placeholder="Enter your last name"
            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
          />
          {errors.lname && (
            <p className="text-red-500 text-xs mt-2">{errors.lname}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="birthDate"
            className="block font-medium text-gray-700"
          >
            Birth Date
          </label>
          <input
            type="date"
            name="birthDate"
            id="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
          />
          {errors.birthDate && (
            <p className="text-red-500 text-xs mt-2">{errors.birthDate}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="country" className="block font-medium text-gray-700">
            Country
          </label>
          <select
            name="country"
            id="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
          >
            <option value="">Select Country</option>
            <option value="Canada">Canada</option>
            <option value="US">United States</option>
            <option value="Mexico">Mexico</option>
            <option value="UK">United Kingdom</option>
            <option value="France">France</option>
            <option value="Germany">Germany</option>
            <option value="Italy">Italy</option>
            <option value="Spain">Spain</option>
          </select>
        </div>

        <fieldset className="space-y-4">
          <legend className="block font-medium text-gray-700">Gender</legend>
          <div>
            <label
              htmlFor="male"
              className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
            >
              <span>Male</span>
              <input
                type="radio"
                name="gender"
                value="Male"
                id="male"
                className="sr-only"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label
              htmlFor="female"
              className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
            >
              <span>Female</span>
              <input
                type="radio"
                name="gender"
                value="Female"
                id="female"
                className="sr-only"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />
            </label>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="block font-medium text-gray-700">Level</legend>
          <div>
            <label
              htmlFor="recreational"
              className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
            >
              <span>Recreational</span>
              <input
                type="radio"
                name="level"
                value="Recreational"
                id="recreational"
                className="sr-only"
                checked={formData.level === "Recreational"}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label
              htmlFor="amateur"
              className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
            >
              <span>Amateur</span>
              <input
                type="radio"
                name="level"
                value="Amateur"
                id="amateur"
                className="sr-only"
                checked={formData.level === "Amateur"}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label
              htmlFor="pro"
              className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
            >
              <span>Pro</span>
              <input
                type="radio"
                name="level"
                value="Pro"
                id="pro"
                className="sr-only"
                checked={formData.level === "Pro"}
                onChange={handleChange}
              />
            </label>
          </div>
        </fieldset>

        <div className="space-y-2">
          <label
            htmlFor="numOfFights"
            className="block font-medium text-gray-700"
          >
            Number of Fights
          </label>
          <select
            name="numOfFights"
            id="numOfFights"
            value={formData.numOfFights}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
          >
            <option value="">Select Range</option>
            <option value="0-5">0-5</option>
            <option value="5-15">5-15</option>
            <option value="15-30">15-30</option>
            <option value="30-60">30-60</option>
            <option value="60-100">60-100</option>
            <option value="100+">100+</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="weight" className="block font-medium text-gray-700">
            Weight (lbs)
          </label>
          <input
            type="number"
            name="weight"
            id="weight"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Enter your weight in lbs"
            className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
          />
          {errors.weight && (
            <p className="text-red-500 text-xs mt-2">{errors.weight}</p>
          )}
        </div>

        <fieldset className="space-y-4">
          <legend className="block font-medium text-gray-700">Stance</legend>
          <div>
            <label
              htmlFor="orthodox"
              className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
            >
              <span>Orthodox</span>
              <input
                type="radio"
                name="stance"
                value="Orthodox"
                id="orthodox"
                className="sr-only"
                checked={formData.stance === "Orthodox"}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label
              htmlFor="southpaw"
              className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
            >
              <span>Southpaw</span>
              <input
                type="radio"
                name="stance"
                value="Southpaw"
                id="southpaw"
                className="sr-only"
                checked={formData.stance === "Southpaw"}
                onChange={handleChange}
              />
            </label>
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white shadow"
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

export default UpdateBoxerProfileForm;
