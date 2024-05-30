import Link from "next/link";
import React from "react";

const RegisterForm = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>
        <p className="mt-4 text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
          nulla eaque error neque ipsa culpa autem, at itaque nostrum!
        </p>
      </div>

      <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
        <div>
          <label htmlFor="UserName" className="sr-only">
            Username
          </label>
          <input
            type="text"
            id="UserName"
            name="username"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter username"
          />
        </div>

        <div>
          <label htmlFor="PhoneNumber" className="sr-only">
            Phone Number
          </label>
          <input
            type="tel"
            id="PhoneNumber"
            name="phone_number"
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Enter phone number"
          />
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
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter email"
            />
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
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Date of Birth"
          />
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
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter password"
            />
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
            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
            placeholder="Confirm password"
          />
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
                  <p className="text-gray-700">Coach</p>
                </div>

                <input
                  type="radio"
                  name="role"
                  value="coach"
                  id="CoachRole"
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
                  <p className="text-gray-700">Boxer</p>
                </div>

                <input
                  type="radio"
                  name="role"
                  value="boxer"
                  id="BoxerRole"
                  className="size-5 border-gray-300 text-blue-500"
                />
              </label>
            </div>
          </fieldset>
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
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
