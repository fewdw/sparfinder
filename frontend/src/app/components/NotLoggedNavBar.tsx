import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <div>
      <header className="bg-white">
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
                <ul className="flex items-center gap-6 text-sm"></ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
