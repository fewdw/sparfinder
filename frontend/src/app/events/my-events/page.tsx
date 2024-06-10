'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import BoxerView from "@/app/components/my-events/BoxerView";
import CoachView from "@/app/components/my-events/CoachView";


const Page = () => {
  const router = useRouter();
  const [accountType, setAccountType] = useState(null);

  useEffect(() => {
    const jwt = Cookies.get("jwt");
    if (jwt) {
      const { account_type } = jwtDecode(jwt);
      if (account_type === "boxer" || account_type === "coach") {
        setAccountType(account_type);
      } else {
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [router]);

  if (!accountType) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <div>
      {accountType === "boxer" && <BoxerView></BoxerView>}
      {accountType === "coach" && <CoachView></CoachView>}
    </div>
  );
};

export default Page;
