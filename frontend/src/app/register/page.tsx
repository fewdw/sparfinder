'use client';
import React from "react";
import NotLoggedNavBar from "../components/NavBar";
import RegisterForm from "../components/RegisterForm";
import { useRouter } from 'next/navigation';
import Popup from "../components/Popup";


const page = () => {

  const router = useRouter();
  const { searchParams } = new URL(window.location.href);
  const register = searchParams.get('register');

  return (

    <div>
      {register === 'true' && <Popup></Popup>}

      <RegisterForm></RegisterForm>
    </div>
  );
};

export default page;
