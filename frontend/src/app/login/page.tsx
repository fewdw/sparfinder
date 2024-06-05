"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import LoginForm from "../components/LoginForm";
import LoginPopup from "../components/LoginPopup";

const Page = () => {
  const searchParams = useSearchParams();
  const register = searchParams.get("register");

  return (
    <div>
      {register === "true" && <LoginPopup />}
      <LoginForm />
    </div>
  );
};

export default Page;
