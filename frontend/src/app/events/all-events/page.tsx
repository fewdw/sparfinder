'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import MenuBar from "@/app/components/MenuBar";
import ViewAllEvents from '@/app/components/all-events/ViewAllEvents';

const Page = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const JWT = Cookies.get('jwt');
    if (!JWT) {
      router.push('/');
      return;
    }

    try {
      const payload = JSON.parse(atob(JWT.split('.')[1])); // Decoding the JWT Payload
      const accountType = payload.account_type;
      if (accountType === 'boxer' || accountType === 'coach') {
        setIsAuthorized(true);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to process JWT', error);
      router.push('/');
    }
    setLoading(false);
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <MenuBar />
      {isAuthorized && <ViewAllEvents />}
    </div>
  );
};

export default Page;
