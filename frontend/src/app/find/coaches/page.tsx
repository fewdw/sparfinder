'use client';
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Correct hook for App Router
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import MenuBar from "@/app/components/MenuBar";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const jwt = Cookies.get("jwt");
    if (jwt) {
      const { account_type } = jwtDecode(jwt);
      if (account_type !== "boxer" && account_type !== "coach") {
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [router]);

  return (
    <div>
      <MenuBar></MenuBar>
      
    </div>
  );
};

export default Page;
