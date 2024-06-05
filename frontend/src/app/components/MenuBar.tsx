import Link from "next/link";
import React, { useState } from "react";

const MenuBar = () => {
  const [isFindOpen, setIsFindOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const toggleDropdown = (
    setDropdownState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setDropdownState((prev) => !prev);
  };

  return (
    <div>
      <header className="bg-white shadow-md">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link className="block text-red-500 font-extrabold" href="/">
                <span className="sr-only">Home</span>
                SparFinder. 🥊
              </Link>
            </div>

            <div className="md:flex md:items-center md:gap-12">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  <li className="relative">
                    <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
                      <button
                        onClick={() => toggleDropdown(setIsFindOpen)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                      >
                        Find
                      </button>
                      <button
                        onClick={() => toggleDropdown(setIsFindOpen)}
                        className="p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    {isFindOpen && (
                      <div className="absolute left-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg">
                        <div className="p-2">
                          <Link
                            className="block rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            href="/find/coaches"
                          >
                            Coaches
                          </Link>
                          <Link
                            className="block rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            href="/find/boxers"
                          >
                            Boxers
                          </Link>
                          <Link
                            className="block rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            href="/find/gyms"
                          >
                            Gyms
                          </Link>
                        </div>
                      </div>
                    )}
                  </li>
                  <li className="relative">
                    <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
                      <button
                        onClick={() => toggleDropdown(setIsEventsOpen)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                      >
                        Events
                      </button>
                      <button
                        onClick={() => toggleDropdown(setIsEventsOpen)}
                        className="p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    {isEventsOpen && (
                      <div className="absolute left-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg">
                        <div className="p-2">
                          <Link
                            className="block rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            href="/events/my-events"
                          >
                            My Events
                          </Link>
                          <Link
                            className="block rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            href="/events/all-events"
                          >
                            All Events
                          </Link>
                          <Link
                            className="block rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            href="/events/waiting-list"
                          >
                            Waiting List
                          </Link>
                          <Link
                            className="block rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            href="/events/invite-list"
                          >
                            Invite List
                          </Link>
                        </div>
                      </div>
                    )}
                  </li>
                  <li className="relative">
                    <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
                      <button
                        onClick={() => toggleDropdown(setIsAccountOpen)}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                      >
                        Account
                      </button>
                      <button
                        onClick={() => toggleDropdown(setIsAccountOpen)}
                        className="p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                    {isAccountOpen && (
                      <div className="absolute left-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg">
                        <div className="p-2">
                          <Link
                            className="block rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            href="/account/details"
                          >
                            Account Details
                          </Link>
                          <Link
                            className="block rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            href="/logout"
                          >
                            Logout
                          </Link>
                        </div>
                      </div>
                    )}
                  </li>
                </ul>
              </nav>

              <div className="flex items-center gap-4">
                <div className="block md:hidden">
                  <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default MenuBar;
