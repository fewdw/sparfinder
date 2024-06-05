"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import MenuBar from "@/app/components/MenuBar";
import CoachAccountDetailSeparator from "@/app/components/CoachAccountDetailSeparator";
import BoxerAccountDetailSeparator from "@/app/components/BoxerAccountDetailSeparator";
import { redirect } from "next/dist/server/api-utils";

interface JwtPayload {
  fname: string;
  lname: string;
  email: string;
  profile_pic: string;
  account_type: string;
  exp: number;
}

const AccountDetails = () => {
  const [accountType, setAccountType] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        if (decoded) {
          setAccountType(decoded.account_type);
        }
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  if (accountType === "coach") {
    return (
      <div>
        <MenuBar></MenuBar>
        <CoachAccountDetailSeparator></CoachAccountDetailSeparator>
      </div>
    );
  }

  if (accountType === "boxer") {
    return (
      <div>
        <MenuBar></MenuBar>
        <BoxerAccountDetailSeparator></BoxerAccountDetailSeparator>
      </div>
    );
  }
};

export default AccountDetails;
