"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Remove the JWT cookie
    Cookies.remove("jwt", {
      secure: true,
      sameSite: "Strict",
    });

    // Redirect to home page
    router.push("/");
  }, [router]);

  return <p>Logging out...</p>;
};

export default LogoutPage;
