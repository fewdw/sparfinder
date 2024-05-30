import React from "react";
import Link from 'next/link';

const MainPageBanner = () => {
  return (
    <div>
      <section className="bg-bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-16 lg:flex lg:items-center">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-3xl font-extrabold sm:text-5xl text-blue-950">
            Find an event.
              <strong className="font-extrabold text-red-700 sm:block"> Spar with your match. </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed">
            SparFinder: Coaches organize events, boxers spar, fostering skill development and community connections.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                className="block w-full rounded bg-red-500 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                href="/register"
              >
                Join Now
              </Link>

              <Link
                className="block w-full rounded px-12 py-3 text-sm font-medium text-red-600 shadow hover:text-red-700 focus:outline-none focus:ring active:text-red-500 sm:w-auto"
                href="/login"
              >
                Already a member?
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPageBanner;
