import React from "react";

const MainPageSection = () => {
  return (
    <div>
      <section className="bg-white text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold sm:text-4xl text-red-700">
              How it works?
            </h2>
            <p className="mt-4 text-blue-950">
              SparFinder has one goal: connect boxers. Coaches organize events,
              boxers spar, fostering skill development and community
              connections.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10">
              📝
              <h2 className="mt-4 text-xl font-bold text-red-700">
                Create Your Profile
              </h2>
              <p className="mt-1 text-sm text-blue-950">
                Boxers and coaches alike can sign up, providing essential
                details to enhance matchmaking.
              </p>
            </div>

            <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10">
              🎉
              <h2 className="mt-4 text-xl font-bold text-red-700">
                Host Gym Events
              </h2>
              <p className="mt-1 text-sm text-blue-950">
                Coaches establish their gym presence and schedule sparring
                sessions through event creation.
              </p>
            </div>

            <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10">
              🥊
              <h2 className="mt-4 text-xl font-bold text-red-700">
                Join Spar Sessions
              </h2>
              <p className="mt-1 text-sm text-blue-950">
                Boxers browse through listed events, selecting and registering
                for those that suit their training needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainPageSection;
