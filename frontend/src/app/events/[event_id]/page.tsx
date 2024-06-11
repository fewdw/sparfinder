'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { EVENT_BELONGS_TO_COACH, BOXER_PARTICIPATE_TO_EVENT } from "../../utils/apiConfig";
import { useParams } from 'next/navigation';
import MenuBar from '@/app/components/MenuBar';
import ModifyEventForm from '@/app/components/my-events/ModifyEventForm';
import CoachViewEventInvitedPeopleList from '@/app/components/CoachViewEventInvitedPeopleList';
import CoachViewEventWaitingPeopleList from '@/app/components/CoachViewEventWaitingPeopleList';
import Link from 'next/link';
import ViewEventOverviewList from '@/app/components/ViewEventOverviewList';
import ViewEventParticipantPeopleList from '@/app/components/ViewEventParticipantPeopleList';

const Page = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();
  const params = useParams();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [joinResult, setJoinResult] = useState('');
  const [accountType, setAccountType] = useState('');

  useEffect(() => {
    const verifyEventOwnership = async () => {
      if (!params.event_id) return;
      const JWT = Cookies.get('jwt');

      if (!JWT) {
        router.push('/');
        return;
      }

      try {
        const payload = JSON.parse(atob(JWT.split('.')[1]));
        setAccountType(payload.account_type);
        const response = await fetch(EVENT_BELONGS_TO_COACH, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ JWT, event_id: params.event_id })
        });
        const data = await response.json();
        setIsAuthorized(response.ok && data.result);
      } catch (error) {
        setError('Failed to verify event ownership. Please try again later.');
        console.error('API error:', error);
      }
      setLoading(false);
    };

    verifyEventOwnership();
  }, [params.event_id, router]);

  const handleJoinEvent = async () => {
    const JWT = Cookies.get('jwt');
    const url = BOXER_PARTICIPATE_TO_EVENT;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ JWT, event_id: params.event_id })
      });
      const data = await response.json();
      setJoinResult(data.result);
    } catch (error) {
      console.error('Failed to join event:', error);
      setJoinResult('Failed to join event.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <ViewEventOverviewList eventId={params.event_id} />
            {accountType === 'boxer' && (
              <div className="mt-4 flex justify-center">
                <button onClick={handleJoinEvent} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Join Event
                </button>
                {joinResult && <p className="mt-2 ml-4 text-sm text-red-600">{joinResult}</p>}
              </div>
            )}
          </>
        );
      case 'participants':
        return <ViewEventParticipantPeopleList eventId={params.event_id} />;
      default:
        if (activeTab === 'waiting' && isAuthorized) {
          return <CoachViewEventWaitingPeopleList eventId={params.event_id} />;
        }
        if (activeTab === 'invited' && isAuthorized) {
          return <CoachViewEventInvitedPeopleList eventId={params.event_id} />;
        }
        if (activeTab === 'modify' && isAuthorized) {
          return <ModifyEventForm eventId={params.event_id} />;
        }
        return <p>Section not found</p>;
    }
  };

  const tabs = ['overview', 'participants'];
  if (isAuthorized) {
    tabs.push('waiting', 'invited', 'modify');
  }

  return (
    <div>
      <MenuBar />
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">Select a tab:</label>
        <select
          id="tabs"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="w-full rounded-md border-gray-200 p-2"
        >
          {tabs.map(tab => (
            <option key={tab} value={tab}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex justify-center gap-6 mt-6" aria-label="Tabs">
            {tabs.map(tab => (
              <Link
                key={tab}
                href="#"
                onClick={(e) => { e.preventDefault(); setActiveTab(tab); }}
                className={`shrink-0 border-b-2 px-1 pb-4 text-sm font-medium ${
                  activeTab === tab ? 'border-sky-500 text-sky-600' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      {renderTabContent()}
    </div>
  );
};

export default Page;
