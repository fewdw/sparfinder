import Link from 'next/link'
import React from 'react'

const LoggedInMainPage = () => {
  return (
    <div>
      <section className="bg-white text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold sm:text-4xl text-red-700">
              Thank you for using sparfinder💪
            </h2>
            <p className="mt-4 text-blue-950">
              SparFinder has one goal: connect boxers. Coaches organize events,
              boxers spar, fostering skill development and community
              connections.
            </p>
          </div>
        
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/account/details">
            <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10">
              📝
              <h2 className="mt-4 text-xl font-bold text-red-700">
                Did you setup your account?
              </h2>
              <p className="mt-1 text-sm text-blue-950">
                Make sure your profile is visible to others by entering your information
              </p>
            </div>
            </Link>
            
            <Link href="/events/all-events">
            <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10">
              🎉
              <h2 className="mt-4 text-xl font-bold text-red-700">
                Find Events
              </h2>
              <p className="mt-1 text-sm text-blue-950">
                Once you finished setting up your profile you can start browsing events!
              </p>
            </div>
            </Link>

            <Link href="/events/my-events">
            <div className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10">
              🥊
              <h2 className="mt-4 text-xl font-bold text-red-700">
                Your Events
              </h2>
              <p className="mt-1 text-sm text-blue-950">
                You can view your past and future sessions in the events tab
              </p>
            </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LoggedInMainPage