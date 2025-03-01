"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import MainPageBanner from "./components/MainPageBanner";
import MainPageSection from "./components/MainPageSection";
import NavBar from "./components/NavBar";
import MenuBar from "./components/MenuBar";
import LoggedInMainPage from "./components/LoggedInMainPage";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Invalid token");
      }
    }
  }, []);

  if (isLoggedIn) {
    return (
      <div>
        <MenuBar></MenuBar>
        <LoggedInMainPage />
      </div>
    );
  }

  return (
    <div>
      <NavBar></NavBar>
      <MainPageBanner />
      <MainPageSection />
    </div>
  );
}
