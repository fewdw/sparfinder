"use client";
import Link from "next/link";
import React, { useState } from "react";
import {
  validateUsername,
  validateEmail,
  validateBirthdate,
  validatePassword,
  validateRoleType,
} from "../utils/Validator";
import { CREATE_ACCOUNT_URL } from "../utils/apiConfig";

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    dob: "",
    password: "",
    password_confirmation: "",
    role: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!validateUsername(form.username)) {
      newErrors.username =
        "Username must be 5-15 characters, lowercase letters, numbers, underscores, or periods.";
    }

    if (!validateEmail(form.email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!validateBirthdate(form.dob)) {
      newErrors.dob =
        "Invalid birthdate. Format: yyyy-mm-dd. Must be between 13 and 65 years old.";
    }

    if (!validatePassword(form.password)) {
      newErrors.password =
        "Password must be 8-30 characters, include special characters, uppercase, lowercase, and no spaces.";
    }

    if (form.password !== form.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match.";
    }

    if (!validateRoleType(form.role)) {
      newErrors.role = "Role must be either 'boxer' or 'coach'.";
    }

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setMessage("");

      const payload = {
        username: form.username,
        email: form.email,
        birth_date: form.dob,
        password: form.password,
        type: form.role,
      };

      try {
        const response = await fetch(CREATE_ACCOUNT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (response.ok) {
          setMessage(data.message || "Account created successfully!");
          // Optionally handle success response
        } else {
          setMessage(data.message || "An error occurred. Please try again.");
        }
      } catch (error) {
        setMessage("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl text-red-500">
          Join SparFinder Today!
        </h1>
        <p className="mt-4 text-blue-950">
          SparFinder is a community with the goal of connecting boxers to grow
          the sport!
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <div>
          <label htmlFor="UserName" className="sr-only">
            Username
          </label>
          <input
            type="text"
            id="UserName"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter username"
          />
          {errors.username && (
            <span className="text-red-500">{errors.username}</span>
          )}
        </div>

        <div>
          <label htmlFor="UserEmail" className="sr-only">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="UserEmail"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter email"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="DOB" className="sr-only">
            Date of Birth
          </label>
          <input
            type="date"
            id="DOB"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Date of Birth"
          />
          {errors.dob && <span className="text-red-500">{errors.dob}</span>}
        </div>

        <div>
          <label htmlFor="Password" className="sr-only">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter password"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password}</span>
            )}
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="PasswordConfirmation" className="sr-only">
            Password Confirmation
          </label>
          <input
            type="password"
            id="PasswordConfirmation"
            name="password_confirmation"
            value={form.password_confirmation}
            onChange={handleChange}
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Confirm password"
          />
          {errors.password_confirmation && (
            <span className="text-red-500">{errors.password_confirmation}</span>
          )}
        </div>

        <div>
          <fieldset className="grid grid-cols-2 gap-4">
            <legend className="sr-only">Role</legend>

            <div>
              <label
                htmlFor="CoachRole"
                className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
              >
                <div>
                  <p className="text-blue-950 font-bold">Coach</p>
                  <p className="mt-1 text-blue-950 font-light">
                    I have a gym and I would like to create events
                  </p>
                </div>

                <input
                  type="radio"
                  name="role"
                  value="coach"
                  id="CoachRole"
                  onChange={handleChange}
                  className="size-5 border-gray-300 text-blue-500"
                />
              </label>
            </div>

            <div>
              <label
                htmlFor="BoxerRole"
                className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 has-[:checked]:border-blue-500 has-[:checked]:ring-1 has-[:checked]:ring-blue-500"
              >
                <div>
                  <p className="text-blue-950 font-bold">Boxer</p>
                  <p className="mt-1 text-blue-950 font-light">
                    I would like to find sparring partners and participate in
                    events
                  </p>
                </div>

                <input
                  type="radio"
                  name="role"
                  value="boxer"
                  id="BoxerRole"
                  onChange={handleChange}
                  className="size-5 border-gray-300 text-blue-500"
                />
              </label>
            </div>
          </fieldset>
          {errors.role && <span className="text-red-500">{errors.role}</span>}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Already a member?&nbsp;
            <Link className="underline" href="/login">
              login
            </Link>
          </p>
          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Sign in"}
          </button>
        </div>
        {message && (
          <p className="mt-4 text-center text-sm text-red-500">{message}</p>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
