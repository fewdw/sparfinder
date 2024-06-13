"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import LoginForm from "../components/LoginForm";
import LoginPopup from "../components/LoginPopup";

const PageContent = () => {
  const searchParams = useSearchParams();
  const register = searchParams.get("register");

  return (
    <div>
      {register === "true" && <LoginPopup />}
      <LoginForm />
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default Page;
